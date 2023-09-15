import { getURL } from "@/utils/get-url";
import axios from "axios";

export const config = {
  headers: {
    Accept: "application/json",
  },
};

export const key = "6d207e02198a847aa98d0a2a901485a5";

axios.defaults.baseURL = getURL();

export default axios;
