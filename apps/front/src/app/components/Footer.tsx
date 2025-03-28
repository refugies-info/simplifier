"use client";

import React from "react";
import { Footer as DsfrFooter } from "@codegouvfr/react-dsfr/Footer";

export const Footer = () => {
  return (
    <DsfrFooter
      className="mt-auto"
      brandTop={
        <>
          République
          <br />
          Française
        </>
      }
      homeLinkProps={{
        href: "/",
        title: "Accueil - Simplifier.gouv.fr",
      }}
      accessibility="fully compliant"
      contentDescription="
    Ce message est à remplacer par les informations de votre site.

    Comme exemple de contenu, vous pouvez indiquer les informations
    suivantes : Le site officiel d’information administrative pour les entreprises.
    Retrouvez toutes les informations et démarches administratives nécessaires à la création,
    à la gestion et au développement de votre entreprise.
    "
    />
  );
};
