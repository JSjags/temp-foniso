import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {};

const SidebarFooter = (props: Props) => {
  return (
    <div className="max-w-[805px] px-6 mt-8 flex gap-4 flex-wrap items-center mx-auto sticky top-0">
      <Link
        href="/terms-of-use"
        target="_blank"
        rel="noreferrer"
        type="button"
        className={cn(
          "bg-transparent text-inactive text-sm",
          "flex justify-center py-1 gap-2 items-center"
        )}
      >
        <span>Terms of service</span>
      </Link>
      <Link
        href="/about-us"
        target="_blank"
        rel="noreferrer"
        type="button"
        className={cn(
          "bg-transparent text-inactive text-sm",
          "flex justify-center py-1 gap-2 items-center"
        )}
      >
        <span>About</span>
      </Link>
      <Link
        href="/faqs"
        target="_blank"
        rel="noreferrer"
        type="button"
        className={cn(
          "bg-transparent text-inactive text-sm",
          "flex justify-center py-1 gap-2 items-center"
        )}
      >
        <span>Help</span>
      </Link>
      <Link
        href="/contact-us"
        target="_blank"
        rel="noreferrer"
        type="button"
        className={cn(
          "bg-transparent text-inactive text-sm",
          "flex justify-center py-1 gap-2 items-center"
        )}
      >
        <span>Contact us</span>
      </Link>
      <Link
        href="/advertising"
        target="_blank"
        rel="noreferrer"
        type="button"
        className={cn(
          "bg-transparent text-inactive text-sm",
          "flex justify-center py-1 gap-2 items-center"
        )}
      >
        <span>Advertising</span>
      </Link>
      <Link
        href="/faqs"
        target="_blank"
        rel="noreferrer"
        type="button"
        className={cn(
          "bg-transparent text-inactive text-sm",
          "flex justify-center py-1 gap-2 items-center"
        )}
      >
        FAQs
      </Link>
      <Link
        href="/privacy-policy"
        target="_blank"
        rel="noreferrer"
        type="button"
        className={cn(
          "bg-transparent text-inactive text-sm",
          "flex justify-center py-1 gap-2 items-center"
        )}
      >
        <span>Privacy policy</span>
      </Link>
      <p
        className={cn(
          "bg-transparent text-inactive text-sm",
          "flex justify-center py-1 gap-2 items-center"
        )}
      >
        <span>C {new Date().getFullYear()} Foniso</span>
      </p>
    </div>
  );
};

export default SidebarFooter;
