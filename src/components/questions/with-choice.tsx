"use client";

import { useInject } from "@/lib/hooks/useInject";
import { RootStoreModel } from "@/lib/store/types";
import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC } from "react";

type QuestionWithChoiceProps = {
  options: string[];
  multiple?: boolean;
};

const mapStore = (rootStore: RootStoreModel) => ({
  checked: rootStore.pollDraft.options,
  question: rootStore.pollDraft.question,
  setQuestion: rootStore.pollDraft.setQuestion,
  setOption: rootStore.pollDraft.setOption,
});

export const QuestionWithChoice: FC<QuestionWithChoiceProps> = observer(
  ({ options, multiple = false }) => {
    const { checked, question, setQuestion, setOption } = useInject(mapStore);

    return (
      <Box className="flex flex-col h-full gap-2">
        {multiple ? (
          <p className="text-zinc-400 text-xs px-5">Multiple choice</p>
        ) : null}
        <List>
          {options.map((option) => {
            return (
              <ListItem
                key={option}
                className="cursor-pointer hover:bg-zinc-100 rounded-md transition"
                onClick={() => {
                  multiple ? setOption(option) : setQuestion(option);
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="end"
                    checked={
                      multiple ? checked.has(option) : question === option
                    }
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={option} />
              </ListItem>
            );
          })}
        </List>
      </Box>
    );
  }
);
