import { Box, CircularProgress } from "@mui/material";
import { LoadingStatus } from "../store/types";

export const ImageWithStatus = ({
  status,
  src,
  progress,
}: {
  progress: number;
  status: string;
  src: string;
}) => {
  switch (status as LoadingStatus) {
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
