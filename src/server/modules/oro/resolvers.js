import wsse from "wsse";
import axios from "axios";
const JSONAPIDeserializer = require("jsonapi-serializer").Deserializer;

const token = wsse({
  username: "admin",
  password: process.env.ORO_ADMIN_API_KEY
});

const axiosInstance = axios.create({
  baseURL: "https://demo.orocommerce.com/",
  timeout: 10000,
  headers: {
    "Content-type": "application/vnd.api+json",
    "X-WSSE": token.getWSSEHeader({ nonceBase64: true }),
    Authorization: 'WSSE profile="UsernameToken"'
  }
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
        }))
        .catch(e => console.log(e))
  },
  Product: {
    name: ({ names }) => names[0].string
  }
};
