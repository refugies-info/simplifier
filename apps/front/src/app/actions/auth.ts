"use server";

import { signIn, signOut } from "@/auth";

export const handleSignIn = async () => {
  await signIn("proconnect", { redirectTo: "/chat" });
};

export const handleSignOut = async () => {
  await signOut();
};
