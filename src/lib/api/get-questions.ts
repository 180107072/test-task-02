import axios from "axios";
import { config, url } from "./config";

export const getQuestions = async <T>() => {
  const { href } = new URL("/api/questions", url);

  const { data } = await axios.get(href, config);

  return data as T;
};
