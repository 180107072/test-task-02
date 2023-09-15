import { Box, Typography } from "@mui/material";

import { FC, PropsWithChildren } from "react";

type SharedProps = {
  title: string;
  body: string;
};

export const QuestionsWrapper: FC<SharedProps & PropsWithChildren> = ({
  title,
  body,
  children,
}) => {
  return (
    <Box className="flex flex-col h-full gap-5 ">
      <Typography className="text-lg p-2 h-full bg-zinc-100 rounded ">
        {title}
      </Typography>

      <Typography className="text-sm p-2 h-full bg-zinc-100 rounded ">
        {body}
      </Typography>

      {children}
    </Box>
  );
};
