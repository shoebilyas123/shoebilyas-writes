import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-black bg-opacity-5 w-full flex items-center justify-center shadow-md">
      <div className="md:w-3/5 px-2 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <Link href={"/"}>
            <a>
              <span className="blog-logo">S H O E B &nbsp; I L Y A S</span>
              <span className="w-full flex justify-end items-right">
                <i style={{ fontFamily: "Roboto" }}>writes</i>
              </span>
            </a>
          </Link>
        </div>
        <div className="sm:hidden md:block">
          <ul className="flex ">
            <li className="hover:opacity-50">
              <Link href="/">
                <a>A R T I C L E S</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
