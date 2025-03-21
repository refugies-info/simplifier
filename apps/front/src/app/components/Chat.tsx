import React from "react";
import { useState, useRef } from "react";
import { Button } from "@codegouvfr/react-dsfr/Button";
import Markdown from "react-markdown";
export default function Chat() {
  const [generation, setGeneration] = useState("... Mon texte simplifié");
  const [isLoading, setIsLoading] = useState(false);
  const [slidePanelState, setSlidePanelState] = useState<"initial" | "slided">(
    "initial"
  );
  const [content, setContent] = useState<string | TrustedHTML>(
    `<p>Mon texte...</p>`
  );

  const generatedTextRef = useRef<HTMLDivElement | null>(null);

  const handleSimplify = async () => {
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
      <div className="grid grid-flow-row lg:grid-flow-col lg:grid-cols-2 min-h-[80vh] mb-10">
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
            <div className="prose [&_*]:text-white [&_a]:border-b-0">
              <Markdown>
                {`### **Mon raisonnement pour la simplification du document initial**

#### **1. Analyse du texte d'origine**
Le texte de l'Office français de l'immigration et de l'intégration (OFII) s'adresse à des personnes étrangères qui viennent signer leur **Contrat d'Intégration Républicaine (CIR)**. Il contient beaucoup d'informations essentielles mais présente plusieurs problèmes :
- **Langage administratif complexe** : phrases longues, termes techniques non expliqués immédiatement.
- **Absence de structure claire** : des sous-parties sont mentionnées mais pas toujours bien séparées.
- **Redondance** : certaines informations sont répétées, ce qui alourdit la lecture.
- **Public cible avec des niveaux de français variés** : il faut un langage clair, structuré et accessible aux personnes non francophones ou maîtrisant mal le français.

#### **2. Structuration et simplification du contenu**
J’ai réorganisé le document en le structurant avec des **titres explicites** et des **sous-sections numérotées**. L’objectif est de permettre une **lecture rapide et intuitive**.

1. **Présentation claire de l'objectif du CIR** :
   - J’ai précisé d’emblée que le CIR marque l’engagement de la personne étrangère à s’intégrer durablement en France.
   - J’ai supprimé les phrases inutiles et complexifiées.

2. **Réorganisation des informations** :
   - J’ai regroupé **les différentes étapes du parcours** en cinq parties bien distinctes :
     - Entretien personnalisé
     - Formations obligatoires
     - Accompagnement vers l’emploi
     - Informations sur les droits
     - Second entretien
   - Cette réorganisation permet de **faciliter la compréhension et la mémorisation** des étapes.

3. **Clarification des conditions pour obtenir la carte de séjour et la nationalité** :
   - Au lieu de présenter ces conditions de façon dispersée, j’ai regroupé les informations dans une section bien définie.
   - J’ai explicité les niveaux linguistiques requis (A1, A2, B1) en les reliant directement aux démarches concernées.

#### **3. Simplification du langage**
J’ai adapté le vocabulaire pour le rendre plus accessible :
- **Utilisation de phrases courtes et directes** :
  - Exemple : *"Si vous respectez ces engagements, vous pourrez obtenir une carte de séjour pluriannuelle."*
  - Au lieu de : *"Si vous respectez ces conditions, une carte de séjour pluriannuelle pourra vous être délivrée."*
- **Remplacement des termes techniques par des explications simples** :
  - *“CECRL”* → défini directement comme *“Cadre européen commun de référence pour les langues”*
- **Ajout d’un lexique en fin de document** pour expliquer les termes importants.

#### **4. Ajout de ressources complémentaires**
J’ai intégré une section **“Pour aller plus loin”** avec des liens vers des sites officiels (OFII, Service Public). Cela permet aux lecteurs d’avoir des sources fiables s’ils veulent plus de détails.
---
**Objectif atteint** : Un document plus clair, structuré, facile à comprendre et plus accessible pour les nouveaux arrivants en France.
`}
              </Markdown>
            </div>
          </div>

          <div
            className={`bg-white relative z-10 p-10 lg:p-20 h-full shadow-[0px_4px_12px_0px_rgba(0,0,18,0.16)] transition-transform ${
              slidePanelState === "slided"
                ? "translate-x-[92%]"
                : "translate-x-0"
            }`}
          >
            <span
              className={` pointer-events-none font-bold uppercase backdrop-blur transition-all absolute inset-0 h-full w-full flex items-center justify-center ${
                isLoading ? "opacity-100" : "opacity-0"
              }`}
            >
              🤖 Je réfléchis
            </span>

            <div className="prose ![&_a]:border-0">
              <Markdown>
                {isLoading ? "Mon texte simplifié" : generation}
              </Markdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
