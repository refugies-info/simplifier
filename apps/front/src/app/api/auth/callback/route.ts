import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const state = url.searchParams.get("state");

  const storedState = (await cookies()).get("oauth_state")?.value;

  if (!state || !storedState || state !== storedState) {
    return NextResponse.json(
      { error: "Invalid state parameter" },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Hello World" });
};
