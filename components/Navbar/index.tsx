import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-black bg-opacity-5 w-full flex items-center justify-center shadow-md">
      <div className="w-3/5 px-2 py-4 flex justify-between">
        <div>
          <Link href={"/"}>
            <a>
              <span className="blog-logo">S H O E B &nbsp; I L Y A S</span>
            </a>
          </Link>
        </div>
        <div>
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
