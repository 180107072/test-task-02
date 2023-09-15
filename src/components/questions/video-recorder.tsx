"use client";

import { Box, Button } from "@mui/material";
import { useState, useRef, FC } from "react";

const mimeType = 'video/webm; codecs="opus,vp8"';

type RecordingState = {
  status: string;
  stream: MediaStream | null;
  video: string | null;
  chunks: Blob[];
  permission: boolean;
};

const VideoRecorder: FC = () => {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const liveVideoFeed = useRef<HTMLVideoElement | null>(null);

  const [recordingState, setRecordingState] = useState<RecordingState>({
    status: "inactive",
    permission: false,
    stream: null,
    video: null,
    chunks: [],
  });

  const updateRecordingState = (update: Partial<RecordingState>) =>
    setRecordingState((prev) => ({ ...prev, ...update }));

  const getCameraPermission = async () => {
    updateRecordingState({ video: null });
    if ("MediaRecorder" in window) {
      try {
        const videoConstraints = {
          audio: false,
          video: true,
        };
        const audioConstraints = { audio: true };

        const audioStream = await navigator.mediaDevices.getUserMedia(
          audioConstraints
        );
        const videoStream = await navigator.mediaDevices.getUserMedia(
          videoConstraints
        );

        const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
          ...audioStream.getAudioTracks(),
        ]);

        updateRecordingState({ permission: true, stream: combinedStream });

        if (!liveVideoFeed.current) return;
        liveVideoFeed.current.srcObject = videoStream;
      } catch (err) {
        alert(err);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    if (!recordingState.stream) return;
    updateRecordingState({ status: "recording" });

    const media = new MediaRecorder(recordingState.stream, { mimeType });

    mediaRecorder.current = media;

    mediaRecorder.current.start();

    const localVideoChunks: Blob[] = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localVideoChunks.push(event.data);
    };

    updateRecordingState({ chunks: localVideoChunks });
  };

  const stopRecording = () => {
    if (!mediaRecorder.current) return;

    updateRecordingState({ permission: false, status: "inactive" });

    mediaRecorder.current.stop();

    mediaRecorder.current.onstop = () => {
      const videoBlob = new Blob(recordingState.chunks, { type: mimeType });
      const videoUrl = URL.createObjectURL(videoBlob);

      updateRecordingState({ video: videoUrl, chunks: [] });
    };
  };

  const { permission, status, video } = recordingState;

  return (
    <Box className="flex flex-col h-full gap-5">
      {!permission ? (
        <Button
          variant="outlined"
          color="info"
          onClick={getCameraPermission}
          type="button"
        >
          Get Camera
        </Button>
      ) : null}
      {permission && status === "inactive" ? (
        <Button
          color="success"
          variant="outlined"
          onClick={startRecording}
          type="button"
        >
          Start Recording
        </Button>
      ) : null}
      {status === "recording" ? (
        <Button
          color="warning"
          variant="outlined"
          onClick={stopRecording}
          type="button"
        >
          Stop Recording
        </Button>
      ) : null}

      <div
        className="bg-zinc-100 w-full mx-auto overflow-hidden rounded-lg flex items-center justify-center"
        style={{
          maxWidth: "700px",
          height: "600px",
        }}
      >
        {!video ? (
          <video
            ref={liveVideoFeed}
            className="w-auto h-full object-cover"
            autoPlay
          />
        ) : null}
        {video ? (
          <video className="w-auto h-full object-cover" src={video} controls />
        ) : null}
      </div>
    </Box>
  );
};

export default VideoRecorder;
