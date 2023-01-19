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
    href: "/"
  },
  {
    label: "Rules",
    href: "/rules"
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
const ResponsiveAppBar = () => {
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
    <div>
      <div>
        <h3>Constellation Cards</h3>
        <div>
          {pages.map((page) => (
            <a key={page.href} href={page.href}>
              <div>{page.label}</div>
            </a>
          ))}
        </div>

        <div>
          <div title={`Logged in as ${session?.user?.name}`}>
            <div onClick={handleOpenUserMenu}>
              {gravatarEmail ? (
                <Gravatar email={gravatarEmail} />
              ) : (
                <img alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              )}
            </div>
          </div>
          <div id="menu-appbar">
            {settings.map((setting) => (
              <div key={setting.label} onClick={setting.onClick}>
                <div>{setting.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResponsiveAppBar;
