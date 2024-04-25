import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {};

const MainFooter = () => {
  return (
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
  );
};

export default MainFooter;
