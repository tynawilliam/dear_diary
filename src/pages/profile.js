import Loader from "@/components/Loader";
import React from "react";
import { signIn } from "next-auth/react";

function profile() {
  return (
    <div>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}

export default profile;
