import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
  providers: [
    {
      id: "proconnect",
      name: "ProConnect",
      type: "oidc",
      wellKnown: `${process.env.PROCONNECT_DOMAIN}/api/v2/.well-known/openid-configuration`,
      issuer: `${process.env.PROCONNECT_DOMAIN}/api/v2`,
      checks: ["nonce", "state"],
      authorization: {
        params: {
          scope: "openid uid given_name email phone siret usual_name",
        },
      },
      clientId: process.env.PROCONNECT_CLIENT_ID,
      clientSecret: process.env.PROCONNECT_CLIENT_SECRET,
    },
  ],
});
