import { NextRequest, NextResponse } from "next/server";

import path from "node:path";
import fs from "node:fs";

export async function GET() {
  const jsonDirectory = path.join(process.cwd(), "data", "questions.json");

  const fileContents = await fs.promises.readFile(jsonDirectory, "utf8");

  return NextResponse.json(JSON.parse(fileContents));
}
