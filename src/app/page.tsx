import { Question } from "@/types/questions-schema";

import { ClientComponent } from "./page.client";
import { getQuestions } from "@/lib/api/get-questions";

import { headers } from "next/headers";
import { getURL } from "@/utils/get-url";

export default async function Home() {
  const questions = await getQuestions<Question[]>();

  console.log(getURL("/"));

  return <ClientComponent questions={questions} />;
}
