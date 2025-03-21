import { config } from "dotenv";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

config();

export const GET = async (req: Request) => {
  const requiredEnvVars = [
    "PROCONNECT_DOMAIN",
    "PROCONNECT_CLIENT_ID",
    "PROCONNECT_REDIRECT_URI",
  ];

  const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

  if (missingVars.length > 0) {
    return NextResponse.json(
      `Missing required environment variables: ${missingVars.join(", ")}`,
      { status: 500 }
    );
  }

  const { PROCONNECT_DOMAIN, PROCONNECT_CLIENT_ID, PROCONNECT_REDIRECT_URI } =
    process.env;

  const state = uuidv4(); // Generate a random nonce
  (await cookies()).set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  const url = new URL(`${PROCONNECT_DOMAIN}/oauth/authorize`);
  const params = new URLSearchParams({
    client_id: PROCONNECT_CLIENT_ID!,
    response_type: "code",
    redirect_uri: PROCONNECT_REDIRECT_URI!,
    scope: "openid email profile phone organizations",
    state: state,
  });

  url.search = params.toString();
  return NextResponse.redirect(url.toString());
};
