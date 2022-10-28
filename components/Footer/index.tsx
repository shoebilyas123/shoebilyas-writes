import Link from "next/link";
import React from "react";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { useTheme } from "next-themes";

import Button from "shoebilyas-common/components/Button";
import Newsletter from "../Newsletter";
import Overlay from "shoebilyas-common/components/Overlay";

const Footer = () => {
  const [showNewsletter, setShowNewsletter] = React.useState(false);
  const { theme } = useTheme();

  return (
    <footer
      className={`mt-4 w-full flex flex-row items-center justify-center text-gray-200 dark:bg-black dark:border-0 dark:border-t dark:border-zinc-800 dark:bg-opacity-15`}
      style={{ background: theme === "dark" ? "" : "var(--font-purple-dark)" }}
    >
      <div className="md:w-4/5 lg:w-1/2 sm:w-full p-8 flex md:flex-row sm:flex-col justify-between ">
        <div className="md:w-1/2 sm:w-full sm:mb-4 text-sm">
          <div className="flex flex-col text-xl font-medium sm:text-center md:text-left">
            Shoeb Ilyas
          </div>
          <i>
            Thanks for reading my article. There is not a specific domain in
            which I write. Philosophy, self-help, productivity, inspirational,
            socio-economic issues etc., whichever topic gets my attention.{" "}
          </i>
        </div>
        <div className="sm:w-full md:w-auto flex flex-col sm:mb-4 sm:items-center md:items-left">
          <p className="text-xl font-medium sm:text-center md:text-left mb-2">
            Links
          </p>
          <Link href="/">
            <a className="text-sm">Articles</a>
          </Link>
        </div>
        <div className="flex flex-col sm:mb-4 sm:items-center md:items-left">
          <p className="text-xl font-medium">Socials</p>
          <Link href="https://www.instagram.com/shoebilyas123/">
            <a target="_blank" className="sm:text-4xl">
              <AiFillInstagram
                // size={24}
                className="hover:text-white hover:cursor-pointer"
              />
            </a>
          </Link>
          <Link href="https://www.linkedin.com/in/shoeb-ilyas/">
            <a target="_blank" className="sm:text-4xl">
              <AiFillLinkedin
                // size={24}
                className="hover:text-white hover:cursor-pointer"
              />
            </a>
          </Link>
        </div>
        <div className="flex flex-col sm:w-full sm:items-center md:items-left md:w-auto">
          <Button onClick={() => setShowNewsletter(true)}>
            <span className="animate-bounce">Newsletter</span>
          </Button>
        </div>
        {showNewsletter && (
          <Overlay>
            <Newsletter onClose={() => setShowNewsletter(false)} />
          </Overlay>
        )}
      </div>
    </footer>
  );
};

export default Footer;
