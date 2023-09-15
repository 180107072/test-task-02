"use client";

import { Inter } from "next/font/google";
import { Stepper } from "@/lib/ui/stepper";
import { Question } from "@/types/questions-schema";
import { useQuestionComponents } from "@/hooks/useQuestionComponents";
import { useInject } from "@/lib/hooks/useInject";
import { RootStoreModel } from "@/lib/store/types";
import { LastStep } from "@/components/questions/finish";

const inter = Inter({ subsets: ["latin"] });

const mapStore = ({ pollDraft: { next, previous } }: RootStoreModel) => ({
  next,
  previous,
});

const additional = [
  {
    title: "LAST",
    actions: <LastStep />,
  },
];

export function ClientComponent({ questions }: { questions: Question[] }) {
  const { next, previous } = useInject(mapStore);

  const questionComponents = useQuestionComponents(questions);

  const allComponents = [...questionComponents, ...additional];

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-12 ${inter.className}`}
    >
      <Stepper onNext={next} onBack={previous} steps={allComponents} />
    </main>
  );
}
