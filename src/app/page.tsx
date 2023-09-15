import { Question } from "@/types/questions-schema";

import { ClientComponent } from "./page.client";
import { getQuestions } from "@/lib/api/get-questions";

export default async function Home() {
  return <ClientComponent />;
}
