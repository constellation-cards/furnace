import { signIn, signOut, useSession } from "next-auth/react";
import * as React from "react";
import Gravatar from "react-gravatar";

interface LinkListElement {
  label: string;
  href: string;
}

interface SettingsElement {
  label: string;
  onClick: any;
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

const settings = ["Logout"];

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
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const { data: session } = useSession();

  const gravatarEmail = session?.user?.email || undefined;

  const settings: SettingsElement[] = [];
  if (session) {
    settings.push({
      label: "Sign out",
      onClick: () => signOut()
    });
  } else {
    settings.push({
      label: "Sign in",
      onClick: () => signIn()
    });
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
        </div>
      </nav>
    </>
  );
}
