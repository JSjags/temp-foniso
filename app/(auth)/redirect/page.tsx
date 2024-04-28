"use client";

import { useUserContext } from "@/context/UserContext";
import { redirect, useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userData = JSON.parse(searchParams.get("udat") ?? "");

  const { setUserData } = useUserContext();

  console.log(userData);

  if (userData) {
    localStorage.setItem("token", userData.access_token);
    localStorage.setItem("userData", JSON.stringify(userData));
    setUserData(userData);

    if (userData.user.username === null) {
      return router.replace("/account-setup", { scroll: false });
    }
  }

  redirect("/home");
};

export default Page;
