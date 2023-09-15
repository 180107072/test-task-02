"use client";

import * as React from "react";

import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useInject } from "@/lib/hooks/useInject";
import { RootStoreModel } from "@/lib/store/types";
import { VisuallyHiddenInput } from "@/lib/ui/hidden-input";

import { observer } from "mobx-react-lite";
import { Box, CircularProgress } from "@mui/material";
import { uploadImage } from "@/lib/api/upload-image";

const mapStore = (rootStore: RootStoreModel) => ({
  setPicture: rootStore.pollDraft.setPicture,
  setLoadingStatus: rootStore.pollDraft.setLoadingStatus,
  pictureName: rootStore.pollDraft.pictureName,
  picture: rootStore.pollDraft.picture,
  loadingStatus: rootStore.pollDraft.loadingStatus,
});

const Image = ({
  status,
  src,
  progress,
}: {
  progress: number;
  status: string;
  src: string;
}) => {
  switch (status) {
    case "loading":
      return (
        <Box className="w-full h-full flex items-center justify-center">
          <CircularProgress variant="determinate" value={progress} />
        </Box>
      );
    case "success":
      return <img src={src} className="w-full h-full object-cover" />;
    case "error":
      return (
        <Box className="w-full uppercase h-full flex items-center justify-center">
          error
        </Box>
      );
  }
};

export const PictureQuestion: React.FC = observer(() => {
  const { setPicture, setLoadingStatus, picture, loadingStatus } =
    useInject(mapStore);

  const [progress, setProgress] = React.useState(0);

  return (
    <>
      <Button
        component="label"
        variant="contained"
        style={{ marginBottom: "auto" }}
        startIcon={<CloudUploadIcon />}
      >
        Upload file {loadingStatus}
        <VisuallyHiddenInput
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={async (e) => {
            if (!e.currentTarget.files) return;

            const file = e.currentTarget.files[0];

            if (file === null) return;

            setLoadingStatus("loading");

            const image = await uploadImage(file, setProgress);

            setPicture(image.url);
          }}
        />
      </Button>
      <div
        className="bg-zinc-100 w-full mx-auto overflow-hidden rounded-lg flex items-center justify-center"
        style={{
          maxWidth: "700px",
          height: "600px",
        }}
      >
        <Image status={loadingStatus} progress={progress} src={picture} />
      </div>
    </>
  );
});
