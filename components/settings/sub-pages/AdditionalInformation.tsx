import Link from "next/link";
import React from "react";

type Props = {};

const AdditionalInformation = (props: Props) => {
  return (
    <div className="flex flex-col gap-y-5">
      <Link href={"/settings?tab=support"}>
        <p className="font-medium text-lg">Support</p>
      </Link>
      <Link href={"#"}>
        <p className="font-medium text-lg">About Foniso</p>
      </Link>
      <Link href={"#"}>
        <p className="font-medium text-lg">Privacy policy</p>
      </Link>
      <Link href={"#"}>
        <p className="font-medium text-lg">Terms of use</p>
      </Link>
    </div>
  );
};

export default AdditionalInformation;
