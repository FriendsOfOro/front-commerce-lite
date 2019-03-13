import faker from "faker";
import typesImplementations from "./typesImplementations";

const currency = "EUR";
let cart = [];

const makeRandomProduct = () => ({
  sku:
    faker.helpers.slugify(faker.commerce.product()) +
    faker.random.number({ min: 7, max: 60 }),
  name: faker.commerce.productName(),
  description: faker.lorem.paragraphs(3, "<br /><br />"),
  imageUrl: faker.image.technics(400, 400),
  prices: { finalPrice: faker.commerce.price() }
});

const catalog = [...new Array(faker.random.number({ min: 7, max: 60 }))].map(
  makeRandomProduct
);

const resolveSomeday = value =>
  new Promise(resolve =>
    setTimeout(
      () => resolve(value),
      faker.random.number({ min: 100, max: 2000 })
    )
  );

export default {
  ...typesImplementations,

  Query: {
    category: () => ({
      name: "My Category",
      layer: ({ params: { size } }) => ({
        products: [...catalog].slice(0, size)
      })
    }),
    product: (_, { sku }) => catalog.find(product => product.sku === sku),
    cart: () => cart
  },

  Mutation: {
    addItemToCart: (_, { sku }) => {
      cart = [...cart, catalog.find(product => product.sku === sku)];
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

  FakeCart: {
    id: () => 42,
    items_qty: cart => cart.length,
    items: cart => cart,
    totals: cart =>
      cart
        .map(product => parseFloat(product.prices.finalPrice))
        .reduce((total, value) => total + value, 0)
  },

  FakeCartItem: {
    item_id: item => cart.indexOf(item) + 1,
    qty: () => 1,
    product: item => item,
    priceInfo: item => item.prices.finalPrice
  },

  FakeCartItemPriceInfo: {
    rowTotalInclTax: amount => ({
      includeTax: true,
      value: { amount: amount, currency }
    })
  },

  FakeCartTotals: {
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
