import Link from "next/link";
import React from "react";
import { BsMailbox, BsPhone, BsTelephone, BsWhatsapp } from "react-icons/bs";

type Props = {};

const Support = (props: Props) => {
  return (
    <div className="space-y-5 mt-5">
      <Link
        href={"https://wa.me/+2349042306905?text=Hello%20there!"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-x-3 items-center"
      >
        <BsWhatsapp className="text-foreground/50 size-[20px]" />
        <p className="font-medium text-base">Message us via Whatsapp</p>
      </Link>
      <Link
        href={"tel:+234704561414"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-x-3 items-center"
      >
        <BsTelephone className="text-foreground/50 size-[20px]" />
        <p className="font-medium text-base">Call us</p>
      </Link>
      <Link
        href={"mailto:admin@@foniso.team"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-x-3 items-center"
      >
        <BsMailbox className="text-foreground/50 size-[20px]" />
        <p className="font-medium text-base">Send us an email</p>
      </Link>
    </div>
  );
};

export default Support;
