import axios, { config } from "./config";

export const getQuestions = async <T>() => {
  const { data } = await axios.get("/api/questions", config);

  return data as T;
};
