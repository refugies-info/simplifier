import React from "react";
import { useState, useRef } from "react";
import { Button } from "@codegouvfr/react-dsfr/Button";
import Markdown from "react-markdown";

export default function Chat() {
  const [generation, setGeneration] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<
    string | TrustedHTML
  >(`<p>Afin d’optimiser l’implémentation des obligations déclaratives inhérentes aux droits successoraux, il convient de diligenter en amont une évaluation patrimoniale exhaustive, prenant en compte l’assiette fiscale consolidée du de cujus. Cette démarche requiert l’articulation conjointe de l’acte de notoriété et de l’inventaire actif/passif, à renseigner selon les prescriptions de l'article 784 du CGI.</p>
<p>L’assujetti devra procéder à la formalisation du Cerfa n°2705 et ses annexes, incluant notamment la ventilation analytique des biens transmissibles, la déduction des passifs déductibles éligibles et l’éventuelle application des abattements en vigueur selon le degré de parenté. La taxation, soumise au barème progressif de l’article 777 du Code général des impôts, doit faire l’objet d’un règlement selon les modalités prévues par le cadre réglementaire en vigueur, avec une option pour le paiement fractionné ou différé en cas de transmission de biens non liquides.</p>
<p>Toute omission ou inexactitude dans la déclaration est susceptible d’entraîner une rectification de la part de l’administration fiscale, assortie des majorations prévues à l’article 1727 du CGI. Afin d’éviter tout contentieux fiscal ou redressement, une consultation préalable d’un officier ministériel ou d’un expert-comptable assermenté est fortement préconisée.</p>
<p>En cas de contentieux post-déclaratif, le redevable pourra formuler une réclamation auprès du service des impôts des entreprises (SIE) compétent dans un délai de six mois suivant la notification de l’avis de mise en recouvrement, sous réserve d’apporter les éléments justificatifs conformes aux exigences de l’instruction fiscale en vigueur.</p>`);

  const generatedTextRef = useRef<HTMLDivElement | null>(null);

  const handleClick = async () => {
    setIsLoading(true);

    await fetch("/api/completion/albert", {
      method: "POST",
      body: JSON.stringify({
        prompt: `${content}`,
      }),
    }).then((response) => {
      response.json().then((json) => {
        setGeneration(json.text);
        setIsLoading(false);
      });
    });
  };

  return (
    <div className="relative">
      <Button
        onClick={handleClick}
        className="hidden lg:flex sticky left-1/2 top-1/2 -translate-x-1/2"
        iconId="ri-arrow-right-line"
        iconPosition="right"
      >
        Simplifier
      </Button>
      <div className="grid grid-flow-row lg:grid-flow-col lg:grid-cols-2 min-h-md my-10">
        <div
          className="prose min-w-full bg-grey975 h-full p-10 lg:p-20"
          contentEditable
          onBlur={(t) => setContent(t.currentTarget.innerHTML)}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <Button
          onClick={() => {
            handleClick();
            if (generatedTextRef.current) {
              generatedTextRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }}
          iconId="ri-arrow-right-line"
          iconPosition="right"
          className="lg:hidden m-auto -translate-y-1/2 -mb-10"
        >
          Simplifier
        </Button>
        <div
          id="generatedTextContainer"
          ref={generatedTextRef}
          className="bg-white p-10 lg:p-20 h-full shadow-[0px_4px_12px_0px_rgba(0,0,18,0.16)]"
        >
          <Markdown className="prose">
            {isLoading ? "Chargement" : generation}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
