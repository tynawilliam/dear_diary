import Loader from "@/components/Loader";
import React from "react";
import { useSession } from "next-auth/react";
import Signout from "@/components/Signout";

function profile() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        {" "}
        <Signout />
      </>
    );
  }
  return <div>Not Logged in</div>;
}

export default profile;
