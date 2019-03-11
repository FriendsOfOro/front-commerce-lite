import faker from "faker";

const currency = "EUR";
let cart = [];

const makeRandomProduct = () => ({
  sku: faker.helpers.slugify(faker.commerce.product()),
  name: faker.commerce.productName,
  description: faker.lorem.paragraphs(3, "<br /><br />"),
  imageUrl: faker.image.technics(400, 400),
  prices: { finalPrice: faker.commerce.price() }
});

const resolveSomeday = value =>
  new Promise(resolve =>
    setTimeout(
      () => resolve(value),
      faker.random.number({ min: 100, max: 2000 })
    )
  );

export default {
  Query: {
    category: () => ({
      name: "My Category",
      layer: ({ params: { size } }) => ({
        products: [...new Array(size)].map(makeRandomProduct)
      })
    }),
    product: makeRandomProduct,
    cart: () => cart
  },

  Mutation: {
    addItemToCart: () => {
      cart = [...cart, makeRandomProduct()];
      return resolveSomeday({
        success: true,
        cart
      });
    },
    removeItemFromCart: (_, { item_id }) => {
      cart.splice(item_id - 1, 1);
      cart = [...cart];
      return resolveSomeday({
        success: true,
        cart
      });
    }
  },

  Cart: {
    id: () => 42,
    items_qty: cart => cart.length,
    items: cart => cart,
    totals: cart =>
      cart
        .map(product => parseFloat(product.prices.finalPrice))
        .reduce((total, value) => total + value, 0)
  },

  CartItem: {
    item_id: item => cart.indexOf(item) + 1,
    qty: () => 1,
    product: item => item,
    priceInfo: item => item.prices.finalPrice
  },

  CartItemPriceInfo: {
    rowTotalInclTax: amount => ({
      includeTax: true,
      value: { amount: amount, currency }
    })
  },

  CartTotals: {
    subtotalInclTax: amount => ({
      includeTax: true,
      value: { amount: amount, currency }
    })
  },

  BothInclAndExclTaxesPrice: {
    priceInclTax: amount => ({
      includeTax: true,
      value: { amount, currency }
    }),
    priceExclTax: amount => ({
      includeTax: false,
      value: { amount, currency }
    })
  }
};
