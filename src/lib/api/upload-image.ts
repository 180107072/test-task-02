import axios from "axios";
import { key, config } from "./config";

export const uploadImage = async (file: File) => {
  const formData = new FormData();

  formData.append("key", key);
  formData.append("action", "upload");
  formData.append("format", "json");
  formData.append("source", file, file.name);

  const { data } = await axios.post("/api/questions", formData, config);

  return data;
};
