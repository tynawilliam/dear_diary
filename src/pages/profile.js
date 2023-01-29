import Loader from "@/components/Loader";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Signout from "@/components/Signout";
import { useRouter } from "next/router";
import getStatus from "@/utils/checkStatus";

function profile() {
  const { data: session } = useSession();
  getStatus();
  if (session) {
    return (
      <>
        {" "}
        <Signout />
      </>
    );
  }
}

export default profile;
