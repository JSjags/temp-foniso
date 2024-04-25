"use client";

import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = (props: Props) => {
  const router = useRouter();

  const { userData } = useUserContext();

  if (!userData) {
    router.replace("/login");
  }

  return <div>{props.children}</div>;
};

export default ProtectedRoute;
