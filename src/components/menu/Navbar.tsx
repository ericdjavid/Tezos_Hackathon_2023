import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import NavItem from "./NavItem";

const MENU_LIST = [
  // { text: "Home", href: "/" },
  // { text: "About Us", href: "/about" },
  // { text: "Contact us", href: "mailto:eric@reskue.art" },
  // { text: "About us", href: "/about" },
];
const Navbar = () => {
  const [navActive, setNavActive] = useState<boolean | null>(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header>
      <nav className={`nav`}>
        <Link href={"/"}>
          {/* <h1 className="logo">Reskue</h1> */}
          {/* <Image src="/RVB_WHITE.png" alt="logo of Reskue" width="30" height="30" /> */}
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;