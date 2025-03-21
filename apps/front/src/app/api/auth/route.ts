import { config } from "dotenv";

config();

export const GET = async (req: Request) => {
  const requiredEnvVars = [
    "PROCONNECT_DOMAIN",
    "PROCONNECT_CLIENT_ID",
    "PROCONNECT_REDIRECT_URI",
  ];

  const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

  if (missingVars.length > 0) {
    return new Response(
      `Missing required environment variables: ${missingVars.join(", ")}`,
      { status: 500 }
    );
  }

  const url = new URL(`${process.env.PROCONNECT_DOMAIN}/oauth/authorize`);
  const params = new URLSearchParams({
    client_id: process.env.PROCONNECT_CLIENT_ID as string,
    response_type: "code",
    redirect_uri: process.env.PROCONNECT_REDIRECT_URI as string,
    scope: "openid email profile phone organizations",
  });

  url.search = params.toString();
  return Response.redirect(url.toString());
};
