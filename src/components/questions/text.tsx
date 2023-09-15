"use client";

import { useInject } from "@/lib/hooks/useInject";
import { RootStoreModel } from "@/lib/store/types";
import { Box, TextareaAutosize } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC } from "react";

type TextQuestionProps = {
  title: string;
  body: string;
};

const mapStore = (rootStore: RootStoreModel) => ({
  setQuestion: rootStore.pollDraft.setQuestion,
  question: rootStore.pollDraft.question,
});

export const TextQuestion: FC<TextQuestionProps> = observer(() => {
  const { question, setQuestion } = useInject(mapStore);

  return (
    <Box className="flex flex-col h-full gap-5">
      <TextareaAutosize
        className="p-2 w-full border-2 mt-auto border-zinc-100 rounded overflow-auto resize-y"
        style={{
          minHeight: 200,
          maxHeight: 200,
        }}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Your answer"
      />
    </Box>
  );
});
