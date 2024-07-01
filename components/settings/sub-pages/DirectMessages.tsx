import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import React from "react";
import { BsMailbox, BsPhone, BsTelephone, BsWhatsapp } from "react-icons/bs";

type Props = {};

const DirectMessages = (props: Props) => {
  return (
    <div className="space-y-10 mt-5">
      <div>
        <p className="text-foreground text-xl font-bold">Allow message from</p>
        <p className="text-foreground/60 mt-1">
          People you follow can always message you.
        </p>
      </div>
      <RadioGroup defaultValue="everyone" className="!mt-20 space-y-5">
        <Label
          htmlFor="verified users"
          className="flex justify-between gap-x-4 items-center"
        >
          <p>Verified users</p>
          <RadioGroupItem
            className="shrink-0"
            value="verified users"
            id="verified users"
          ></RadioGroupItem>
        </Label>
        <Label
          htmlFor="everyone"
          className="flex justify-between gap-x-4 items-center"
        >
          <p>Everyone</p>
          <RadioGroupItem
            className="shrink-0"
            value="everyone"
            id="everyone"
          ></RadioGroupItem>
        </Label>
        <Label
          htmlFor="no-one"
          className="flex justify-between gap-x-4 items-center"
        >
          <p>No one</p>
          <RadioGroupItem
            className="shrink-0"
            value="no-one"
            id="no-one"
          ></RadioGroupItem>
        </Label>
      </RadioGroup>
    </div>
  );
};

export default DirectMessages;
