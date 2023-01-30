import Loader from "@/components/Loader";
import Signout from "@/components/Signout";
import getStatus from "@/utils/checkStatus";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();
  getStatus();
  if (!session) return <Loader />;

  if (session) {
    console.log(session);
    return (
      <>
        <h1>Home</h1>
        <Signout />
      </>
    );
  }
}
