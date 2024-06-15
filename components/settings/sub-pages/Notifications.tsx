import React from "react";
import SwitchCard from "../SwitchCard";
import NavCard from "../NavCard";

type Props = {};

const Notification = (props: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      <SwitchCard title="Pause all notification" />
      <NavCard title="Push notification" />
      <SwitchCard title="SMS notification" />
      <SwitchCard title="Email notification" />
    </div>
  );
};

export default Notification;
