import wsse from "wsse";
import axios from "axios";

const token = wsse({
  username: "admin",
  password: process.env.ORO_ADMIN_API_KEY
});

const axiosInstance = axios.create({
  baseURL: "https://demo.orocommerce.com/",
  timeout: 10000,
  headers: {
    "Content-type": "application/json",
    "X-WSSE": token.getWSSEHeader({ nonceBase64: true }),
    Authorization: 'WSSE profile="UsernameToken"'
  }
});

export default {
  Query: {
    hello: () =>
      axiosInstance
        .get("admin/api/countries")
        .then(({ data }) => JSON.stringify(data, null, 2))
        .catch(e => console.log(e))
  }
};
