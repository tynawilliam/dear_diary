import React from "react";
import { useSession } from "next-auth/react";
import Signout from "@/components/Signout";
import getStatus from "@/utils/checkStatus";

export default function profile() {
  const { data: session } = useSession();
  getStatus();
  return (
    <>
      <h1>User</h1>
      <Signout />
    </>
  );
}
