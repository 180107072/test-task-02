import axios from "axios";
import { key, config } from "./config";

export const uploadImage = async (
  file: File,
  cb = (progress: number) => {}
) => {
  const formData = new FormData();

  formData.append("key", key);
  formData.append("action", "upload");
  formData.append("format", "json");
  formData.append("source", file, file.name);

  const { data } = await axios.post("/api/upload-image", formData, {
    ...config,
    onUploadProgress: (progress) => {
      if (progress.total)
        cb(Math.round((progress.loaded * 100) / progress.total));
    },
  });

  return data;
};
