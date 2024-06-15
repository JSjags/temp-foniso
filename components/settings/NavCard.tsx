import React from "react";
import { Switch } from "../ui/switch";
import { PiCaretRightThin } from "react-icons/pi";

type Props = {
  title: string;
};

const NavCard = ({ title }: Props) => {
  return (
    <div className="flex justify-between items-center mt-6 cursor-pointer">
      <p className="font-medium">{title}</p>
      <PiCaretRightThin className="text-2xl text-foreground/80" />
    </div>
  );
};

export default NavCard;
