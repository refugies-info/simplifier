import { ProConnectButton } from "@codegouvfr/react-dsfr/ProConnectButton";
import Image from "next/image";

export const Login = () => {
  return (
    <div className="grid grid-cols-12 gap-4 h-full max-w-full overflow-x-clip">
      <div className="col-span-5 h-screen bg-gray-300">
        <div className="flex justify-center mt-20">
          <Image
            src="/images/logo-welcome-page.svg"
            alt="Logo de bienvenue sur Simplifier.gouv.fr"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="col-span-7">
        <div className="m-10 text-left gap-6 flex flex-col">
          <h2 className="text-[2rem] leading-10 font-bold">
            Bienvenue sur Simplifier.gouv.fr !
          </h2>
          <div>Esse eu velit sit ex ea.</div>
          <ProConnectButton url="/api/auth" />
        </div>
      </div>
    </div>
  );
};
