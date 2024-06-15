import React from "react";
import { Switch } from "../ui/switch";

type Props = {
  title: string;
};

const SwitchCard = ({ title }: Props) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <p className="font-medium">{title}</p>
      <Switch />
    </div>
  );
};

export default SwitchCard;
