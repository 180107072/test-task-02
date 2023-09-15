"use client";

import { useInject } from "@/lib/hooks/useInject";
import { RootStoreModel } from "@/lib/store/types";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";

const mapStore = (rootStore: RootStoreModel) => ({
  pictures: rootStore.publishedPolls.collectPictures,
});

export const LastStep = observer(() => {
  const { pictures } = useInject(mapStore);

  const uploadedPictures = pictures();

  return (
    <>
      <h1 className="mb-5">Uploaded</h1>
      <Box className="flex flex-wrap gap-2">
        {uploadedPictures.length
          ? uploadedPictures.map((src) => {
              return (
                <img
                  src={src}
                  key={src}
                  className=" w-36 h-36 object-cover overflow-hidden rounded-lg"
                />
              );
            })
          : "No pics"}
      </Box>
    </>
  );
});
