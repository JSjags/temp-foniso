import React from "react";
import NavList from "../NavList";
import DetailCard from "../DetailCard";

type Props = {};

const item_list = [
  {
    //   icon: MessageSquareTextIcon,
    count: 5,
    label: "App theme",
    desc: "Dark Mode",
    href: "app-theme",
  },
  {
    //   icon: Ban,
    count: 5,
    label: "Languages",
    desc: "Choose application language",
    href: "languages",
  },
];
const Display = (props: Props) => {
  return (
    <div className="mt-5 min-h-screen bg-background">
      {item_list.map(({ count, desc, href, label }) => (
        <DetailCard
          key={label}
          label={label}
          href={href as string}
          // count={generateCount(href ?? "")}
          desc={desc}
        />
      ))}
    </div>
  );
};

export default Display;
