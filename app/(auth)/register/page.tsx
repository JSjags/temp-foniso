"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { CircleCheckBig } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import VerificationInput from "react-verification-input";

const page = () => {
  const cld = new Cloudinary({ cloud: { cloudName: "delflsgq4" } });

  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get("tab");

  const identifyPage = (currentTab: string | null) => {
    switch (currentTab) {
      case null:
        return (
          <div className="w-full max-w-[571px] p-6 pb-8 pt-4 border border-border bg-background rounded-xl mt-6 mb-20">
            <h2 className="text-xl sm:text-[24px] text-center font-bold text-foreground mb-4">
              Create account
            </h2>
            <div>
              <Label
                htmlFor="country"
                className="text-foreground text-base font-semibold mt-8"
              >
                Your country
              </Label>
              <Select>
                <SelectTrigger className="w-full mt-2 text-foreground/50 bg-transparent border-foreground/50 h-[54px] font-semibold">
                  <SelectValue
                    placeholder="Select your country"
                    className="text-white text-base text-semibold placeholder:text-foreground/50 font-semibold"
                    color="white"
                  />
                </SelectTrigger>
                <SelectContent className="bg-darkGrey border-border mt-4">
                  <SelectItem
                    className="py-2 text-base text-foreground/50 font-semibold data-[highlighted]:text-black"
                    value="light"
                  >
                    Light
                  </SelectItem>
                  <SelectItem
                    className="py-2 text-base text-foreground/50 font-semibold data-[highlighted]:text-black"
                    value="dark"
                  >
                    Dark
                  </SelectItem>
                  <SelectItem
                    className="py-2 text-base text-foreground/50 font-semibold data-[highlighted]:text-black"
                    value="system"
                  >
                    System
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4">
              <Label
                htmlFor="email"
                className="text-colorWhite text-base font-semibold"
              >
                Your email address
              </Label>
              <Input
                id="email"
                placeholder="Enter your email address"
                className="bg-transparent mt-2 border-foreground/50 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold"
              />
            </div>

            <Button
              onClick={() => router.push("?tab=verify")}
              className="w-full hover:bg-foreground hover:text-background hover:scale-[1.01] transition-all hover:shadow-xl bg-background border border-border text-foreground rounded-full flex justify-center items-center mt-10 h-[54px]"
            >
              <span className="text-base font-bold block p-0 align-middle -translate-y-[2px]">
                Create account
              </span>
            </Button>
            <div className="flex items-center justify-center gap-x-1 text-foreground/50 mt-4 text-base">
              <span className="whitespace-nowrap">
                Already have an account?
              </span>
              <Button
                variant={"ghost"}
                className="w-fit h-fit transition-all flex justify-center items-center p-0"
              >
                <span className="text-base text-foreground font-bold block p-0 align-middle">
                  Log in
                </span>
              </Button>
            </div>
          </div>
        );
      case "verify":
        return (
          <div className="w-full max-w-[571px] p-6 pb-8 pt-4 border border-border bg-background rounded-xl mt-6 mb-20">
            <h2 className="text-xl sm:text-[24px] text-center font-bold text-foreground mb-4">
              Verify your email address
            </h2>
            <p className="text-foreground/50 text-center mx-auto max-w-60">
              We have sent a 6-digit code to{" "}
              <span className="text-foreground font-bold">0700000000</span>.
              Enter the code below
            </p>
            <div className="flex justify-center mt-10">
              <VerificationInput
                classNames={{
                  container: "max-w-[360px] min-w-[240px] w-full",
                  character:
                    "bg-foreground/10 size-[50px_!important] flex justify-center items-center border-border rounded text-foreground font-semibold text-base",
                  characterInactive: "character--inactive",
                  characterSelected: "border-colorWhite",
                  characterFilled: "character--filled",
                }}
                onComplete={() => router.push("?tab=username")}
              />
            </div>

            <div className="text-foreground/50 mt-4 text-base">
              <span className="">
                Didn’t get code the code? Resend new code in
              </span>
              <span className="transition-all inline-flex justify-center items-center p-0">
                <span className="text-base text-foreground font-bold block p-0 align-middle">
                  {" "}
                  : 59
                </span>
              </span>
            </div>
          </div>
        );
      case "username":
        return (
          <div className="w-full max-w-[571px] p-6 pb-8 pt-4 border border-border bg-background rounded-xl mt-6 mb-20">
            <h2 className="text-[24px] text-center font-bold text-foreground mb-4">
              Choose a username
            </h2>
            <p className="text-foreground/50 text-center mx-auto max-w-60">
              Personalize Your Experience with a Unique Username!
            </p>
            <div className="mt-4">
              <Input
                id="username"
                placeholder="johndoe123"
                className="bg-transparent mt-2 border-foreground/50 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold"
              />
            </div>
            <div className="flex gap-x-1 items-center justify-start mt-2">
              <CircleCheckBig size={14} className="text-green-500" />
              <span className="text-small text-green-500">Good to go</span>
            </div>
            <Button
              onClick={() => router.push("?tab=set-password")}
              className="w-full hover:bg-foreground hover:scale-[1.01] transition-all hover:shadow-xl bg-foreground border border-border text-background rounded-full flex justify-center items-center mt-10 h-[54px]"
            >
              <span className="text-base font-bold block p-0 align-middle -translate-y-[2px]">
                Continue
              </span>
            </Button>
          </div>
        );
      case "set-password":
        return (
          <div className="w-full max-w-[571px] p-6 pb-8 pt-4 border border-border bg-background rounded-xl mt-6 mb-20">
            <h2 className="text-xl sm:text-[24px] text-center font-bold text-foreground mb-4">
              Create a password
            </h2>
            <p className="text-foreground/50 text-center mx-auto max-w-[360px]">
              Secure your account by creating a password you will always
              remember.
            </p>
            <div className="mt-6">
              <Input
                id="password"
                placeholder="Enter password"
                className="bg-transparent mt-2 border-foreground/50 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold"
              />
            </div>
            <div className="mt-4">
              <Input
                id="confirmPassword"
                placeholder="Confirm password"
                className="bg-transparent mt-2 border-foreground/50 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold"
              />
            </div>
            <div className="flex gap-x-1 items-center justify-start mt-2">
              <span className="text-small text-foreground/50">
                Password strength:{" "}
              </span>
              <span className="text-small text-red-500">Weak</span>
            </div>

            <p className="text-foreground/50 mt-4 text-base">
              Password must be at least 8 characters, contain a number and a
              symbol
            </p>

            <Button
              onClick={() => router.push("?tab=personal-details")}
              className="group w-full hover:bg-background hover:text-foreground hover:scale-[1.01] transition-all hover:shadow-xl bg-foreground text-background border border-border rounded-full flex justify-center items-center mt-10 h-[54px]"
            >
              <span className="text-base font-bold block p-0 align-middle -translate-y-[2px]">
                Continue
              </span>
            </Button>
            <Button
              onClick={() => router.push("?tab=username")}
              variant={"link"}
              className="w-full transition-all rounded-full flex justify-center items-center mt-0 h-[54px]"
            >
              <span className="text-base font-bold block p-0 align-middle -translate-y-[2px]">
                Go back
              </span>
            </Button>
          </div>
        );
      case "personal-details":
        return (
          <div className="w-full max-w-[571px] p-6 pb-8 pt-4 border border-border bg-background rounded-xl mt-6 mb-20">
            <Image
              alt="foniso logo mt-4"
              src={"/assets/favicon.svg"}
              width={40}
              height={40}
              className="block mx-auto size-[40px] mt-2"
            />
            <h2 className="text-xl sm:text-[24px] text-center font-bold text-foreground mb-4 mt-4">
              Personal information
            </h2>
            <div className="flex flex-col sm:flex-row gap-x-5">
              <div className="mt-4 w-full">
                <Label
                  htmlFor="firstName"
                  className="text-foreground text-base font-semibold"
                >
                  First name
                </Label>
                <Input
                  id="email"
                  placeholder=""
                  className="bg-transparent mt-2 border-foreground/50 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold"
                />
              </div>
              <div className="mt-4 w-full">
                <Label
                  htmlFor="lastName"
                  className="text-foreground text-base font-semibold"
                >
                  Last name
                </Label>
                <Input
                  id="email"
                  placeholder=""
                  className="bg-transparent mt-2 border-foreground/50 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-x-5">
              <div className="mt-4 w-full">
                <Label
                  htmlFor="DateOfBirth"
                  className="text-foreground text-base font-semibold"
                >
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  placeholder="dd-mm-yy"
                  className="bg-transparent mt-2 border-foreground/50 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold"
                />
              </div>
              <div className="mt-4 w-full">
                <Label
                  htmlFor="sex"
                  className="text-foreground text-base font-semibold mt-8"
                >
                  Select your favorite sport
                </Label>
                <Select>
                  <SelectTrigger
                    id="sex"
                    className="w-full mt-2 text-foreground/50 bg-transparent border-foreground/50 h-[54px] font-semibold"
                  >
                    <SelectValue
                      placeholder="Select"
                      className="text-foreground text-base text-semibold placeholder:text-foreground/50 font-semibold"
                      color="white"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border mt-4">
                    <SelectItem
                      className="py-2 text-base text-foreground/50 font-semibold data-[highlighted]:text-background"
                      value="light"
                    >
                      Male
                    </SelectItem>
                    <SelectItem
                      className="py-2 text-base text-foreground/50 font-semibold data-[highlighted]:text-background"
                      value="dark"
                    >
                      Female
                    </SelectItem>
                    <SelectItem
                      className="py-2 text-base text-foreground/50 font-semibold data-[highlighted]:text-background"
                      value="system"
                    >
                      Prefer not to choose
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <Label
                htmlFor="favorite sport"
                className="text-foreground text-base font-semibold mt-8"
              >
                Select your favorite sport
              </Label>
              <Select>
                <SelectTrigger className="w-full mt-2 text-foreground/50 bg-transparent border-foreground/50 h-[54px] font-semibold">
                  <SelectValue
                    placeholder="Select sport"
                    className="text-foreground text-base text-semibold placeholder:text-foreground/50 font-semibold"
                    color="white"
                  />
                </SelectTrigger>
                <SelectContent className="bg-background border-border mt-4">
                  <SelectItem
                    className="py-2 text-base text-foreground/50 font-semibold data-[highlighted]:text-background"
                    value="light"
                  >
                    Football
                  </SelectItem>
                  <SelectItem
                    className="py-2 text-base text-foreground/50 font-semibold data-[highlighted]:text-background"
                    value="dark"
                  >
                    Basketball
                  </SelectItem>
                  <SelectItem
                    className="py-2 text-base text-foreground/50 font-semibold data-[highlighted]:text-background"
                    value="system"
                  >
                    Cricket
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={() => router.push("/home")}
              className="w-full hover:bg-background hover:scale-[1.01] transition-all hover:shadow-xl bg-foreground border border-border hover:text-foreground text-background rounded-full flex justify-center items-center mt-10 h-[54px]"
            >
              <span className="text-base font-bold block p-0 align-middle -translate-y-[2px]">
                Continue
              </span>
            </Button>
            <Button
              onClick={() => router.push("?tab=set-password")}
              variant={"link"}
              className="w-full transition-all text-foreground rounded-full flex justify-center items-center mt-0 h-[54px]"
            >
              <span className="text-base font-bold block p-0 align-middle -translate-y-[2px]">
                Go back
              </span>
            </Button>
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div className="bg-background min-h-screen p-2">
      <div className="max-w-[1812px] flex flex-col min-h-screen">
        <div className="mt-20">
          <div className="max-w-[188px] flex justify-center items-center sm:px-10">
            <AdvancedImage
              className="w-full max-w-[231px] -translate-y-[120%]"
              cldImg={cld.image("foniso/logo")}
            />
          </div>
          <div className="w-full flex flex-col items-center mt-10">
            <h1 className="text-[1.5rem] md:text-[2.5rem] md:leading-[3rem] font-bold text-foreground">
              Your All-in-One Sports Platform
            </h1>
            {identifyPage(tab)}
          </div>
        </div>
        <div className="max-w-[805px] mt-8 flex flex-col gap-y-2 items-center mx-auto p-2">
          <div className="flex gap-x-7 gap-y-2 flex-wrap">
            <Link
              href="/terms-of-use"
              target="_blank"
              rel="noreferrer"
              type="button"
              className={cn(
                "bg-transparent text-textNav",
                "flex justify-center py-1 gap-2 items-center"
              )}
            >
              <span className="whitespace-nowrap">Terms of service</span>
            </Link>
            <Link
              href="/about-us"
              target="_blank"
              rel="noreferrer"
              type="button"
              className={cn(
                "bg-transparent text-textNav",
                "flex justify-center py-1 gap-2 items-center"
              )}
            >
              <span className="whitespace-nowrap">About</span>
            </Link>
            <Link
              href="/faqs"
              target="_blank"
              rel="noreferrer"
              type="button"
              className={cn(
                "bg-transparent text-textNav",
                "flex justify-center py-1 gap-2 items-center"
              )}
            >
              <span className="whitespace-nowrap">Help</span>
            </Link>
            <Link
              href="/contact-us"
              target="_blank"
              rel="noreferrer"
              type="button"
              className={cn(
                "bg-transparent text-textNav",
                "flex justify-center py-1 gap-2 items-center"
              )}
            >
              <span className="whitespace-nowrap">Contact us</span>
            </Link>
            <Link
              href="/advertising"
              target="_blank"
              rel="noreferrer"
              type="button"
              className={cn(
                "bg-transparent text-textNav",
                "flex justify-center py-1 gap-2 items-center"
              )}
            >
              <span className="whitespace-nowrap">Advertising</span>
            </Link>
            <Link
              href="/privacy-policy"
              target="_blank"
              rel="noreferrer"
              type="button"
              className={cn(
                "bg-transparent text-textNav",
                "flex justify-center py-1 gap-2 items-center"
              )}
            >
              <span className="whitespace-nowrap">Privacy policy</span>
            </Link>
            <p
              className={cn(
                "bg-transparent text-textNav",
                "flex justify-center py-1 gap-2 items-center"
              )}
            >
              <span className="whitespace-nowrap">
                C {new Date().getFullYear()} Foniso
              </span>
            </p>
          </div>
          <div className="flex gap-x-7 gap-y-2 flex-wrap">
            <Link
              href="/support"
              target="_blank"
              rel="noreferrer"
              type="button"
              className={cn(
                "bg-transparent text-textNav",
                "flex justify-center py-1 gap-2 items-center"
              )}
            >
              <span className="whitespace-nowrap">Support</span>
            </Link>
            <Link
              href="/faqs"
              target="_blank"
              rel="noreferrer"
              type="button"
              className={cn(
                "bg-transparent text-textNav",
                "flex justify-center py-1 gap-2 items-center"
              )}
            >
              <span className="whitespace-nowrap">FAQs</span>
            </Link>
            <Link
              href="/ticketing"
              target="_blank"
              rel="noreferrer"
              type="button"
              className={cn(
                "bg-transparent text-textNav",
                "flex justify-center py-1 gap-2 items-center"
              )}
            >
              <span className="whitespace-nowrap">Ticketing</span>
            </Link>
            <p
              className={cn(
                "bg-transparent text-textNav",
                "flex justify-center py-1 gap-2 items-center"
              )}
            >
              <span className="whitespace-nowrap">
                C {new Date().getFullYear()} Foniso
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
