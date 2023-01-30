import getStatus from "@/utils/checkStatus";
import React from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import Signout from "@/components/Signout";

export default function Document() {
  const { data: session } = useSession();
  getStatus();
  if (!session) return <Loader />;
  return (
    <>
      <h1>Document</h1>
      <Signout />
    </>
  );
}
