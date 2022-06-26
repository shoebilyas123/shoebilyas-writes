import Link from "next/link";
import React from "react";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import NewsletterInput from "../Newsletter/NewsletterInput";

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer
      className={`${classes.footer} lg:mt-6 w-full flex flex-row items-center justify-center text-gray-200`}
      style={{ background: "var(--font-purple-dark)" }}
    >
      <div className="md:w-4/5 lg:w-1/2 sm:w-full p-6 flex md:flex-row sm:flex-col justify-between ">
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
          <Link href="https://www.linkedin.com/in/shoeb-ilyas/">
            <a target="_blank" className="sm:text-4xl">
              <AiFillInstagram
                // size={24}
                className="hover:text-white hover:cursor-pointer"
              />
            </a>
          </Link>
          <Link href="https://www.instagram.com/shoebilyas123/">
            <a target="_blank" className="sm:text-4xl">
              <AiFillLinkedin
                // size={24}
                className="hover:text-white hover:cursor-pointer"
              />
            </a>
          </Link>
        </div>
        {/* <div className="flex flex-col sm:w-full sm:items-center md:items-left md:w-auto">
          <NewsletterInput isFooter={true} />
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
