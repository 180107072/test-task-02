import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API = "https://freeimage.host/api/1/upload";

export async function POST(request: NextRequest) {
  const url = new URL(API);
  const { data } = await axios
    .post(url.href, await request.formData())
    .catch((res) => res.data)
    .catch((e) => {
      return null;
    });

  if (data !== null) {
    return NextResponse.json({ url: data.image.url });
  }

  NextResponse.json({ url: null });
}
