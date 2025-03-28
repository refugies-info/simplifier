"use server";

import { signIn } from "@/auth";

export async function handleSignIn() {
  await signIn("proconnect", { redirectTo: "/chat" });
}
