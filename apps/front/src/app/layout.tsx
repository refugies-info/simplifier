import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { getHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes";
import { StartDsfr } from "./startDsfr";
import { defaultColorScheme } from "./defaultColorScheme";
import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";
import { AppHeader } from "./components/AppHeader";
import { AppFooter } from "./components/AppFooter";

export const metadata: Metadata = {
  title:
    "Simplifier.gouv.fr - Simplifier le langage administratif pour ses usagers",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = "fr";
  return (
    <html {...getHtmlAttributes({ defaultColorScheme, lang })}>
      <head>
        <StartDsfr />
        <DsfrHead Link={Link} />
      </head>
      <body className="min-h-screen border">
        <DsfrProvider lang={lang}>
          <AppHeader />
          <main className="min-h-screen">{children}</main>
          <AppFooter />
        </DsfrProvider>
      </body>
    </html>
  );
}
