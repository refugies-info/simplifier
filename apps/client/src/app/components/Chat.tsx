import React from "react";
import { useState, useRef } from "react";
import { Button } from "@codegouvfr/react-dsfr/Button";
import Markdown from "react-markdown";
import { Quote } from "@codegouvfr/react-dsfr/Quote";
export default function Chat() {
  const [generation, setGeneration] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [slidePanelState, setSlidePanelState] = useState<"initial" | "slided">(
    "initial"
  );
  const [content, setContent] = useState<
    string | TrustedHTML
  >(`<p>Afin d’optimiser l’implémentation des obligations déclaratives inhérentes aux droits successoraux, il convient de diligenter en amont une évaluation patrimoniale exhaustive, prenant en compte l’assiette fiscale consolidée du de cujus. Cette démarche requiert l’articulation conjointe de l’acte de notoriété et de l’inventaire actif/passif, à renseigner selon les prescriptions de l'article 784 du CGI.</p>
<p>L’assujetti devra procéder à la formalisation du Cerfa n°2705 et ses annexes, incluant notamment la ventilation analytique des biens transmissibles, la déduction des passifs déductibles éligibles et l’éventuelle application des abattements en vigueur selon le degré de parenté. La taxation, soumise au barème progressif de l’article 777 du Code général des impôts, doit faire l’objet d’un règlement selon les modalités prévues par le cadre réglementaire en vigueur, avec une option pour le paiement fractionné ou différé en cas de transmission de biens non liquides.</p>
<p>Toute omission ou inexactitude dans la déclaration est susceptible d’entraîner une rectification de la part de l’administration fiscale, assortie des majorations prévues à l’article 1727 du CGI. Afin d’éviter tout contentieux fiscal ou redressement, une consultation préalable d’un officier ministériel ou d’un expert-comptable assermenté est fortement préconisée.</p>
<p>En cas de contentieux post-déclaratif, le redevable pourra formuler une réclamation auprès du service des impôts des entreprises (SIE) compétent dans un délai de six mois suivant la notification de l’avis de mise en recouvrement, sous réserve d’apporter les éléments justificatifs conformes aux exigences de l’instruction fiscale en vigueur.</p>`);

  const generatedTextRef = useRef<HTMLDivElement | null>(null);

  const handleSimplify = async () => {
    setIsLoading(true);

    await fetch("/api/completion/chatgpt", {
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

  const handleSlidePanel = () => {
    const switchState = slidePanelState === "initial" ? "slided" : "initial";

    setSlidePanelState(switchState);
  };

  return (
    <div className="relative max-w-full overflow-x-clip">
      <Button
        onClick={handleSimplify}
        className="hidden z-20 lg:flex sticky left-1/2 top-1/2 -translate-x-1/2 border-1 border-grey975"
        iconId="ri-arrow-right-line"
        iconPosition="right"
      >
        Simplifier
      </Button>
      <div className="grid grid-flow-row lg:grid-flow-col lg:grid-cols-2 min-h-md mb-10">
        <div
          className="prose min-w-full bg-grey975 h-full p-10 lg:p-20"
          contentEditable
          onBlur={(t) => setContent(t.currentTarget.innerHTML)}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <Button
          onClick={() => {
            handleSimplify();
            if (generatedTextRef.current) {
              generatedTextRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }}
          iconId="ri-arrow-right-line"
          iconPosition="right"
          className="lg:hidden z-20 m-auto -translate-y-1/2 -mb-10"
        >
          Simplifier
        </Button>
        <div
          id="generatedTextContainer"
          ref={generatedTextRef}
          className="relative z-10 "
        >
          <nav className="absolute w-fit z-20 top-4 right-4">
            <Button
              iconId="fr-icon-questionnaire-fill"
              onClick={handleSlidePanel}
              priority="tertiary no outline"
              title="Label button"
              className="border border-grey975"
            />
          </nav>
          <div
            className="bg-[#21213f] p-10 lg:p-20 absolute z-0 inset-0 [&_span]:text-white [&_p]:text-white flex flex-col gap-4 overflow-y-auto"
            data-fr-theme="dark"
          >
            <Quote
              source={
                <>
                  <li>
                    <cite>Ouvrage</cite>
                  </li>
                  <li>Détail 1</li>
                  <li>Détail 2</li>
                  <li>Détail 3</li>
                  <li>
                    <a href="#">Détail 4</a>
                  </li>
                </>
              }
              text={<span className="text-white">Lorem [...] elit ut.</span>}
            />
            <Quote
              source={
                <>
                  <li>
                    <cite>Ouvrage</cite>
                  </li>
                  <li>Détail 1</li>
                  <li>Détail 2</li>
                  <li>Détail 3</li>
                  <li>
                    <a href="#">Détail 4</a>
                  </li>
                </>
              }
              text={<span className="text-white">Lorem [...] elit ut.</span>}
            />
            <Quote
              source={
                <>
                  <li>
                    <cite>Ouvrage</cite>
                  </li>
                  <li>Détail 1</li>
                  <li>Détail 2</li>
                  <li>Détail 3</li>
                  <li>
                    <a href="#">Détail 4</a>
                  </li>
                </>
              }
              text={<span className="text-white">Lorem [...] elit ut.</span>}
            />
            <Quote
              source={
                <>
                  <li>
                    <cite>Ouvrage</cite>
                  </li>
                  <li>Détail 1</li>
                  <li>Détail 2</li>
                  <li>Détail 3</li>
                  <li>
                    <a href="#">Détail 4</a>
                  </li>
                </>
              }
              text={<p className="text-white">Lorem [...] elit ut.</p>}
            />
          </div>

          <div
            className={`bg-white z-10 p-10 lg:p-20 h-full shadow-[0px_4px_12px_0px_rgba(0,0,18,0.16)] transition-transform ${
              slidePanelState === "slided"
                ? "translate-x-[92%]"
                : "translate-x-0"
            }`}
          >
            <span>🤖Je réfléchis</span>

            <Markdown className="prose">
              {isLoading ? "Chargement" : generation}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}
