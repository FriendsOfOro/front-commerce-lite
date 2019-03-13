import wsse from "wsse";
import axios from "axios";
const JSONAPIDeserializer = require("jsonapi-serializer").Deserializer;

const axiosInstance = axios.create({
  baseURL: "https://demo.orocommerce.com/",
  timeout: 10000
});
axiosInstance.interceptors.request.use(config => {
  const token = wsse({
    username: "admin",
    password: process.env.ORO_ADMIN_API_KEY
  });

  return {
    ...config,
    headers: {
      "Content-type": "application/vnd.api+json",
      "X-WSSE": token.getWSSEHeader({ nonceBase64: true }),
      Authorization: 'WSSE profile="UsernameToken"'
    }
  };
});

export default {
  Query: {
    category: () =>
      axiosInstance
        .get("admin/api/products", {
          params: {
            include: "names"
          }
        })
        .then(({ data }) => ({
          name: "All products",
          layer: {
            products: new JSONAPIDeserializer().deserialize(data)
          }
        })),
    product: (_, { sku }) =>
      axiosInstance
        .get("admin/api/products", {
          params: {
            include: "names",
            "filter[sku]": sku
          }
        })
        .then(({ data }) => new JSONAPIDeserializer().deserialize(data))
        .then(products => (products.length ? products[0] : null))
  },
  Product: {
    name: ({ names }) => names[0].string,
    prices: () => {
      const fakeValue = {
        amount: 42.99,
        currency: "USD"
      };
      return {
        finalPrice: {
          priceInclTax: {
            value: fakeValue,
            includeTax: true
          },
          priceExclTax: {
            value: fakeValue,
            includeTax: false
          }
        }
      };
    }
  }
};
