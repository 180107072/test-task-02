"use client";

import { Inter } from "next/font/google";
import { Stepper } from "@/lib/ui/stepper";
import { Question } from "@/types/questions-schema";
import { useQuestionComponents } from "@/hooks/useQuestionComponents";
import { useInject } from "@/lib/hooks/useInject";
import { RootStoreModel } from "@/lib/store/types";
import { LastStep } from "@/components/questions/finish";
import { useEffect, useState } from "react";
import { getQuestions } from "@/lib/api/get-questions";

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

export function ClientComponent() {
  console.log(process.env.NEXT_PUBLIC_SITE_URL);
  const { next, previous } = useInject(mapStore);

  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setQuestions(await getQuestions());
    };

    fetchData();
  }, []);

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
