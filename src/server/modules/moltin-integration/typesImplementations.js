export default {
  CatalogQueries: {
    __resolveType: () => "Query"
  },
  Category: {
    __resolveType: () => "MoltinCategory"
  },
  Layer: {
    __resolveType: () => "MoltinPaginatedProducts"
  },
  Product: {
    __resolveType: () => "MoltinProduct"
  },
  ProductPrices: {
    __resolveType: () => "MoltinPrices"
  }
};
