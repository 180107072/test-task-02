import { Question } from "@/types/questions-schema";

import { ClientComponent } from "./page.client";
import { getQuestions } from "@/lib/api/get-questions";

export default async function Home() {
  const questions = await getQuestions<Question[]>();

  return <ClientComponent questions={questions} />;
}
