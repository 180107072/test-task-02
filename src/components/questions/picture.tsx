"use client";

import * as React from "react";

import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useInject } from "@/lib/hooks/useInject";
import { RootStoreModel } from "@/lib/store/types";
import { VisuallyHiddenInput } from "@/lib/ui/hidden-input";

import { observer } from "mobx-react-lite";

const mapStore = (rootStore: RootStoreModel) => ({
  setPicture: rootStore.pollDraft.setPicture,
  pictureName: rootStore.pollDraft.pictureName,
  picture: rootStore.pollDraft.picture,
});

export const PictureQuestion: React.FC = observer(() => {
  const { setPicture, picture } = useInject(mapStore);

  return (
    <>
      <Button
        component="label"
        variant="contained"
        style={{ marginBottom: "auto" }}
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={async (e) => {
            if (!e.currentTarget.files) return;

            const file = e.currentTarget.files[0];

            if (file === null) return;

            setPicture(file);
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
        <img src={picture} className="w-full h-full object-cover" />
      </div>
    </>
  );
});
