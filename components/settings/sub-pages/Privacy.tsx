import { Ban, MessageSquareTextIcon } from "lucide-react";
import React from "react";
import NavList from "../NavList";

type Props = {};

const item_list = [
  {
    icon: MessageSquareTextIcon,
    count: 5,
    label: "Direct messages",
    desc: "Manage who can message you directly",
    href: "direct-messages",
  },
  {
    icon: Ban,
    count: 5,
    label: "Blocked account",
    desc: "Manage the accounts you have blocked",
    href: "blocked-accounts",
  },
];

const Privacy = (props: Props) => {
  return (
    <div className="mt-5 min-h-screen bg-background">
      {item_list.map(({ icon, count, desc, href, label }) => (
        <NavList
          key={label}
          icon={icon as unknown as keyof JSX.IntrinsicElements}
          label={label}
          href={href as string}
          // count={generateCount(href ?? "")}
          desc={desc}
          removePadding
        />
      ))}
    </div>
  );
};

export default Privacy;
