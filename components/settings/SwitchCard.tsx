import React from "react";
import { Switch } from "../ui/switch";

type Props = {
  title: string;
  value?: boolean;
  onChange?: () => void;
};

const SwitchCard = ({ title, value, onChange }: Props) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <p className="font-medium">{title}</p>
      <Switch checked={value} onChange={onChange} />
    </div>
  );
};

export default SwitchCard;
