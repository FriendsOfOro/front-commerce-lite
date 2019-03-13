export default {
  CatalogQueries: {
    __resolveType: () => "Query"
  },
  CartQueries: {
    __resolveType: () => "Query"
  },
  CartMutations: {
    __resolveType: () => "Mutation"
  },
  Cart: {
    __resolveType: () => "FakeCart"
  },
  CartItem: {
    __resolveType: () => "FakeCartItem"
  },
  CartItemPriceInfo: {
    __resolveType: () => "FakeCartItemPriceInfo"
  },
  CartTotals: {
    __resolveType: () => "FakeCartTotals"
  },
  Category: {
    __resolveType: () => "FakeCategory"
  },
  Layer: {
    __resolveType: () => "FakeLayer"
  },
  Product: {
    __resolveType: () => "FakeProduct"
  },
  ProductPrices: {
    __resolveType: () => "FakeProductPrices"
  }
};
