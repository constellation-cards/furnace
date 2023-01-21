import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Gravatar from "react-gravatar";

import styles from "../styles/LoginWidget.module.sass"

function UserImage({session}: {session: Session}) {
  // return (session?.user?.image) ? <img src={session.user.image} className={styles.discordImage} /> : <Gravatar email={session?.user?.email || undefined} />
  return <Gravatar email={session?.user?.email || undefined} />
}

export default function LoginWidget() {
  const { data: session } = useSession();
  const gravatarEmail = session?.user?.email || undefined;

  if (session) {
    return (
      <div className="navbar-item has-dropdown is-hoverable">
        <div className="navbar-link is-arrowless">
          <UserImage session={session} />
        </div>
        <div className="navbar-dropdown is-right">
          <div className="navbar-item">
            {session?.user?.name}
          </div>
          <div className="navbar-item">
            <button className="button is-primary" onClick={() => signOut()}>Sign out</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar-item">
        <div className="navbar-link is-arrowless">
          <button className="button" onClick={() => signIn()}>Sign in</button>
        </div>
      </div>
    );
  }
}
