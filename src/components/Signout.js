import React from "react";
import { signOut } from "next-auth/react";

function Signout() {
  return <button onClick={() => signOut()}>Sign Out</button>;
}

export default Signout;
