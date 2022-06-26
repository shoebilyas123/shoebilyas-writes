import Link from "next/link";
import React from "react";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import NewsletterInput from "../Newsletter/NewsletterInput";

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer
      className={`${classes.footer} mt-6 mb-0 w-full flex flex-row items-center justify-center`}
      style={{ color: "var(--font-purple-dark)" }}
    >
      <div className="w-1/2 p-6 flex flex-row justify-between">
        <div className="w-1/2 text-sm">
          <div className="flex flex-col text-md font-medium">Shoeb Ilyas</div>
          <p>
            We all have heard this phrase a gazillion times that we should not
            compare ourselves with others but it is ubiquitous that people
            don&#39;t apply this in their life. One of the reasons is the
            company they surround themselves with and the thoughts that dominate
            their mind. Now this require a separate article to be talked about.
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-md font-medium">Links</p>
          <Link href="/">
            <a className="hover:text-bg-white">Home</a>
          </Link>
          <Link href="/">
            <a>Articles</a>
          </Link>
        </div>
        <div className="flex flex-col">
          <p className="text-md font-medium">Socials</p>
          <Link href="https://www.linkedin.com/in/shoeb-ilyas/">
            <a target="_blank">
              <AiFillInstagram
                size={24}
                className="hover:text-white hover:cursor-pointer"
              />
            </a>
          </Link>
          <Link href="https://www.instagram.com/shoebilyas123/">
            <a target="_blank">
              <AiFillLinkedin
                size={24}
                className="hover:text-white hover:cursor-pointer"
              />
            </a>
          </Link>
        </div>
        <div className="flex flex-col">
          <NewsletterInput />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
