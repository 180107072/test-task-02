import { PictureQuestion } from "@/components/questions/picture";
import { TextQuestion } from "@/components/questions/text";
import VideoRecorder from "@/components/questions/video-recorder";
import { QuestionWithChoice } from "@/components/questions/with-choice";
import { QuestionsWrapper } from "@/layouts/questions-wrapper";
import { Question, QuestionTypes } from "@/types/questions-schema";
import { FC, ReactNode, useMemo } from "react";

export type QuestionComponent = {
  actions: ReactNode;
  title: string;
};

const questionComponents: Record<QuestionTypes, FC<any>> = {
  withChoice: QuestionWithChoice,
  videoResponse: VideoRecorder,
  photoResponse: PictureQuestion,
  text: TextQuestion,
};

export const useQuestionComponents = (
  questions: Question[]
): QuestionComponent[] => {
  const components = useMemo(() => {
    return questions.map((question) => {
      const { type, title, body, ...props } = question;

      const Component = questionComponents[type];

      return {
        title,
        actions: (
          <QuestionsWrapper title={title} body={body}>
            <Component {...props} />
          </QuestionsWrapper>
        ),
      };
    });
  }, [questions]);

  return components;
};
