"use client";
import React from "react";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { Header as DsfrHeader } from "@codegouvfr/react-dsfr/Header";
import Link from "next/link";

export const Header = () => {
  return (
    <>
      <DsfrHeader
        className="[&_.fr-responsive-img]:w-20"
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
        id="fr-header-with-horizontal-operator-logo"
        operatorLogo={{
          alt: "Logo Simplifier.gouv.fr",
          imgUrl: "/images/simplifier-info-logo.svg",
          orientation: "horizontal",
        }}
        quickAccessItems={[
          <a
            href="#"
            key="co"
            className="fr-btn fr-icon-lock-line"
            id="fr-header-with-operator-logo-with-link-quick-access-item-1"
          >
            Se connecter
          </a>,
          <a
            key="enr"
            href="#"
            className="fr-btn fr-icon-account-line"
            id="fr-header-with-operator-logo-with-link-quick-access-item-2"
          >
            S’enregistrer
          </a>,
        ]}
        serviceTagline={
          <>
            <Link
              href="/"
              title="Accueil - Nom de l’entité (ministère, secrétariat d'état, gouvernement)"
            >
              <span className="fr-header__service-title">
                Simplifier.gouv.fr{" "}
                <Badge as="span" noIcon severity="success">
                  Beta
                </Badge>
              </span>
            </Link>
            <br />
            {`L'information administrative pour tous`}
          </>
        }
        // serviceTitle="Simplifier.gouv.fr"
        serviceTitle={
          <>
            Nom du site / service{" "}
            <Badge as="span" noIcon severity="success">
              Beta
            </Badge>
          </>
        }
      />
    </>
  );
};
