"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { WrapperProps } from "@/types";
import HomeSidebar from "./right-sidebar/HomeSidebar";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

const PublicSidebar = ({ children, className }: WrapperProps) => {
  const { theme } = useTheme();
  const [logoPath, setLogoPath] = useState("/assets/logo-dark.svg");
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "hidden min-[860px]:block min-w-[280px] w-full max-w-[480px] min-h-screen h-fit border-l border-border bg-background sticky",
        className
      )}
    >
      <div
        className={cn(
          "hidden min-[860px]:block min-w-[280px] w-full min-h-screen h-fit border-l border-border bg-background sticky",
          className
        )}
      >
        <div className="bg-background min-h-screen">
          <div className="max-w-[1812px] flex flex-col ju min-h-screen">
            <div className="flex mt-[5vh] px-2">
              <div className=" w-full flex flex-col justify-center items-center">
                <div className="w-full max-w-[571px] p-6 border border-border bg-background rounded-xl">
                  <h1 className="text-2xl font-bold text-foreground">
                    Welcome to Foniso
                  </h1>
                  <p className="text-foreground/50 mt-2">
                    Your All-in-One Sports Platform
                  </p>
                  <Button
                    onClick={() => signIn("google")}
                    className="w-full hover:bg-colorGrey/10 bg-transparent border border-border text-foreground rounded-full flex justify-center gap-x-2 items-center mt-6 h-12"
                  >
                    <Image
                      alt="google"
                      src={"/assets/google-icon.svg"}
                      width={30}
                      height={30}
                      className="h-[30px]"
                    />
                    <span className="text-base font-bold block p-0 align-middle -translate-y-[2px]">
                      Continue with Google
                    </span>
                  </Button>
                  <div className="h-5 mt-1 relative after:content-['or'] after:block after:w-6 after:text-center after:text-foreground/50 after:bg-background after:absolute after:left-1/2 after:-translate-x-1/2 after:top-2/3 after:-translate-y-1/3 before:block before:w-full before:bg-border before:h-[1px] before:absolute before:bottom-0" />
                  <Link href={"/register"}>
                    <Button className="w-full hover:scale-[1.01] transition-all hover:shadow-xl text-white bg-black dark:bg-white border border-colorGrey dark:text-black rounded-full flex justify-center items-center mt-6 h-12">
                      <span className="text-base font-bold block p-0 align-middle -translate-y-[2px]">
                        Create account
                      </span>
                    </Button>
                  </Link>
                  <p className="text-foreground/50 mt-5">
                    By signing up, you agree to the Terms of Service and Privacy
                    Policy
                  </p>
                  <p className="text-foreground mt-8 text-base font-semibold">
                    Already have an account?
                  </p>
                  <Link href={"/login"}>
                    <Button className="w-full hover:scale-[1.01] hover:bg-transparent bg-transparent border border-foreground/50 text-foreground rounded-full flex justify-center items-center mt-2 h-12">
                      <span className="text-base font-bold block p-0 align-middle -translate-y-[2px]">
                        Log in
                      </span>
                    </Button>
                  </Link>
                </div>
                <p className="text-foreground mt-4 text-base font-semibold">
                  Get app on:
                </p>
                {/* <div className="flex justify-center items-center gap-4"></div> */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 pt-2 mt-2">
                  <Link
                    href="https://play.google.com/store/apps/details?id=team.foniso.app"
                    target="_blank"
                    rel="noreferrer"
                    type="button"
                    className={cn(
                      "bg-background rounded-md text-white cta-text",
                      "flex justify-center py-1 gap-2 items-center"
                    )}
                  >
                    <Image
                      alt="play store"
                      src={"/assets/playstore.svg"}
                      width={170.44}
                      height={50.77}
                      className="h-[50px]"
                    />
                    {/* <div>
                <p className="text-xs">GET IT ON</p>
                <p className="leading-6">Download on Android</p>
              </div> */}
                  </Link>
                  <Link
                    href="https://apps.apple.com/us/app/foniso/id6478035444"
                    target="_blank"
                    rel="noreferrer"
                    type="button"
                    className={cn(
                      "bg-background rounded-md text-white cta-text",
                      "flex justify-center py-1 items-center"
                    )}
                  >
                    <Image
                      alt="apple store"
                      src={"/assets/applestore.svg"}
                      className="h-[50px]"
                      width={138.56}
                      height={50}
                    />
                  </Link>
                </div>
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
                  <span className="whitespace-nowrap text-sm">
                    Terms of service
                  </span>
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
                  <span className="whitespace-nowrap text-sm">About</span>
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
                  <span className="whitespace-nowrap text-sm">Help</span>
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
                  <span className="whitespace-nowrap text-sm">Contact us</span>
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
                  <span className="whitespace-nowrap text-sm">Advertising</span>
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
                  <span className="whitespace-nowrap text-sm">
                    Privacy policy
                  </span>
                </Link>
                <p
                  className={cn(
                    "bg-transparent text-textNav",
                    "flex justify-center py-1 gap-2 items-center"
                  )}
                >
                  <span className="whitespace-nowrap text-sm">
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
                  <span className="whitespace-nowrap text-sm">Support</span>
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
                  <span className="whitespace-nowrap text-sm">FAQs</span>
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
                  <span className="whitespace-nowrap text-sm">Ticketing</span>
                </Link>
                <p
                  className={cn(
                    "bg-transparent text-textNav",
                    "flex justify-center py-1 gap-2 items-center"
                  )}
                >
                  <span className="whitespace-nowrap text-sm">
                    C {new Date().getFullYear()} Foniso
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicSidebar;
