"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axiosInstance";
import toast from "react-hot-toast";
import ErrorToast from "@/components/reusable/toasts/ErrorToast";
import SuccessToast from "@/components/reusable/toasts/SuccessToast";
import {
  CreateAccount,
  SetPassword,
  SetUsername,
  VerifyOTP,
} from "@/components/sub-pages/registration";
import MainFooter from "@/components/MainFooter";

const Page = () => {
  const { theme } = useTheme();
  const [logoPath, setLogoPath] = useState("/assets/logo-dark.svg");

  useEffect(() => {
    setLogoPath(
      theme === "light" || theme === "undefined"
        ? "/assets/logo-dark.svg"
        : "/assets/logo.svg"
    );
  }, [theme]);

  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get("tab");

  const verifyEmail = () => {
    router.push("?tab=verify");
  };
  const createUsername = () => {
    router.push("?tab=username");
  };
  const setPassword = () => {
    router.push("?tab=set-password");
  };
  const goToLogin = () => {
    router.replace("/login");
  };

  const submitFormData = useMutation({
    mutationKey: ["create-account"],
    mutationFn: (data: any) => axiosInstance.post("/auth/signup", data),
    onError: (error: any) => {
      console.log(error);
      toast.custom((t) => (
        <ErrorToast
          t={t}
          message={
            error?.response?.data?.message ??
            "Couldn't sign you up at the moment."
          }
        />
      ));
    },
    onSuccess: (data: any) => {
      console.log(data);
      if (data.data.data.verified === false) return verifyEmail();
      if (data.data.data.username === null) return createUsername();
      if (!data.data.data.isPasswordSet) return setPassword();
      verifyEmail();
    },
  });

  const submitOTP = useMutation({
    mutationKey: ["submit-otp"],
    mutationFn: (data: any) => axiosInstance.post("/auth/verify", data),
    onError: (error: any) => {
      console.log(error);
      toast.custom((t) => (
        <ErrorToast
          t={t}
          message={
            error?.response?.data?.message ??
            "Couldn't verify OTP at the moment."
          }
        />
      ));
    },
    onSuccess: (data: any) => {
      console.log(data);
      toast.custom((t) => (
        <SuccessToast t={t} message={"OTP verified successfully."} />
      ));
      createUsername();
    },
  });

  const submitUsername = useMutation({
    mutationKey: ["submit-username"],
    mutationFn: (data: { email: string; username: string }) =>
      axiosInstance.patch("/auth/create-username", data),
    onError: (error: any) => {
      toast.custom((t) => (
        <ErrorToast
          t={t}
          message={
            error?.response?.data?.message ??
            "Couldn't create username at the moment."
          }
        />
      ));
    },
    onSuccess: (data: any) => {
      console.log(data);
      toast.custom((t) => (
        <SuccessToast t={t} message={"Username created successfully."} />
      ));
      setPassword();
    },
  });

  const submitPassword = useMutation({
    mutationKey: ["submit-password"],
    mutationFn: (data: {
      email: string;
      password: string;
      password_confirmation: string;
    }) => axiosInstance.patch("/auth/update-password", data),
    onError: (error: any) => {
      toast.custom((t) => (
        <ErrorToast
          t={t}
          message={
            error?.response?.data?.message ??
            "Couldn't create password at the moment."
          }
        />
      ));
    },
    onSuccess: (data: any) => {
      console.log(data);
      toast.custom((t) => (
        <SuccessToast
          t={t}
          message={
            "Password created successfully. Please login to complete account setup."
          }
        />
      ));
      goToLogin();
    },
  });

  const identifyPage = (currentTab: string | null) => {
    const phoneNumber = submitFormData?.data?.data?.data?.mobile;
    const email = submitFormData?.data?.data?.data?.email;

    switch (currentTab) {
      case null:
        return <CreateAccount submitFormData={submitFormData} />;
      case "verify":
        if (!phoneNumber || !email) {
          router.push("register");
        }
        return <VerifyOTP email={email} submitOTP={submitOTP} />;
      case "username":
        if (!phoneNumber || !email) {
          router.push("register");
        }
        return <SetUsername email={email} submitUsername={submitUsername} />;
      case "set-password":
        if (!phoneNumber || !email) {
          router.push("register");
        }
        return <SetPassword email={email} submitPassword={submitPassword} />;
      default:
        break;
    }
  };

  return (
    <div className="bg-background bg-bgEffect min-h-screen p-2">
      <div className="max-w-[1812px] flex flex-col min-h-screen">
        <div className="mt-20">
          <div className="max-w-[188px] flex justify-center items-center sm:px-10">
            <Image
              alt="logo"
              src={logoPath}
              className="w-full max-w-[231px] -translate-y-[120%]"
              width={165.65}
              height={23}
            />
          </div>
          <div className="w-full flex flex-col items-center mt-10">
            <h1 className="text-[1.5rem] md:text-[2.5rem] md:leading-[3rem] font-bold text-foreground">
              Your All-in-One Sports Platform
            </h1>
            {identifyPage(tab)}
          </div>
        </div>
        <MainFooter />
      </div>
    </div>
  );
};

export default Page;
