import * as React from "react";
import LoginWidget from "./LoginWidget";

interface LinkListElement {
  label: string;
  href: string;
}

const pages: LinkListElement[] = [
  {
    label: "Cards",
    href: "/all-cards/"
  },
  {
    label: "Rules",
    href: "/rules/"
  }
];

/**
 * An app bar that includes:
 *
 * - The site logo & title
 * - Links to the Card DB, the rules text, and a "play" option
 * - A right-aligned icon indicating whether the user is logged in
 *
 * @returns
 */
export default function ConstellationCardsAppbar() {
  return (
    <>
      <nav className="navbar is-info" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            Constellation Cards
          </a>
          <div
            className="navbar-burger"
            data-target="navbarExampleTransparentExample"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            {pages.map((linkListElement) => (
              <a
                className="navbar-item"
                href={linkListElement.href}
                key={linkListElement.href}
              >
                {linkListElement.label}
              </a>
            ))}
          </div>
          <div className="navbar-end">
            <LoginWidget />
          </div>
        </div>
      </nav>
    </>
  );
}
