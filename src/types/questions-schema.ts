export type QuestionTypes =
  | "text"
  | "withChoice"
  | "videoResponse"
  | "photoResponse";

export interface Question {
  type: QuestionTypes;
  title: string;
  body: string;
}

export interface QuestionWithOptions extends Question {
  options: string[];
  multiple: boolean;
}
