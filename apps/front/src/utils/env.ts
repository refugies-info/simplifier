import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    ALBERT_API_KEY: z.string().min(1),
    NODE_ENV: z.enum(["development", "production", "test"]),
    PROCONNECT_CLIENT_ID: z.string().min(1),
    PROCONNECT_CLIENT_SECRET: z.string().min(1),
    PROCONNECT_DOMAIN: z.string().url(),
  },
  client: {},
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {},
});
