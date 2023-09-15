import axios, { key, config } from "./config";

export const uploadImage = async (file: File) => {
  const formData = new FormData();

  formData.append("key", key);
  formData.append("action", "upload");
  formData.append("format", "json");
  formData.append("source", file, file.name);

  const { data } = await axios.post("/api/upload-image", formData, config);

  return data;
};
