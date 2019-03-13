import typesImplementations from "./typesImplementations";

export default {
  ...typesImplementations,

  Query: {
    category: (_, { id }, Moltin) => {
      // TODO Remove this hack when strings will be allowed for category ids
      if (id === 48) {
        id = "7d65fca7-3c34-4f33-a539-949755a76af5";
      }
      return Moltin.Categories.Get(id).then(({ data }) => data);
    },
    product: (_, { sku }, Moltin) =>
      Moltin.Products.Filter({ eq: { sku } })
        .All()
        .then(({ data }) => data[0])
  },

  MoltinCategory: {
    layer: ({ id }, { params: { size, from } }, Moltin) => {
      return Moltin.Products.Limit(size)
        .Offset(from)
        .Filter({
          eq: {
            category: {
              id
            }
          }
        })
        .With(["category"])
        .All();
    }
  },

  MoltinPaginatedProducts: {
    products: ({ data }) => data
  },

  MoltinProduct: {
    imageUrl: (product, _, Moltin) => {
      const img = product.relationships.main_image;
      if (!img) {
        return;
      }
      return Moltin.Files.Get(img.data.id).then(({ data }) => data.link.href);
    },
    prices: product => product.meta.display_price
  },

  MoltinPrices: {
    finalPrice: prices => {
      const adaptPrice = ({ amount, currency }) => ({
        amount: amount / 100,
        currency
      });
      return {
        priceInclTax: {
          value: adaptPrice(prices.with_tax),
          includeTax: true
        },
        priceExclTax: {
          value: adaptPrice(prices.without_tax),
          includeTax: false
        }
      };
    }
  }
};
