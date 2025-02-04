"use client";
import { useState } from "react";
import { Button } from "@codegouvfr/react-dsfr/Button";

export default function Page() {
  const [generation, setGeneration] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <Button
        onClick={async () => {
          setIsLoading(true);

          await fetch("/api/completion/albert", {
            method: "POST",
            body: JSON.stringify({
              prompt:
                "Je voudrais savoir comment faire pour obtenir mon permis de conduire",
            }),
          }).then((response) => {
            response.json().then((json) => {
              setGeneration(json.text);
              setIsLoading(false);
            });
          });
        }}
      >
        Generate
      </Button>

      {isLoading ? "Loading..." : generation}
    </div>
  );
}
