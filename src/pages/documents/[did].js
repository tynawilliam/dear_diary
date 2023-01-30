import getStatus from "@/utils/checkStatus";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import Signout from "@/components/Signout";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function Document() {
  const { data: session } = useSession();
  const [value, setValue] = useState("");
  getStatus();
  if (!session) return <Loader />;
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "lightGrey",
        margin: "0",
      }}
    >
      <div
        style={{
          width: "70vw",
          height: "80vh",
          backgroundColor: "whitesmoke",
          marginLeft: "15vw",
        }}
      >
        <ReactQuill value={value} onChange={setValue} />;
      </div>
    </div>
  );
}
