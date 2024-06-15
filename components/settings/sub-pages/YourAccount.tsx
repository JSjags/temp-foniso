import React from "react";
import DetailCard from "../DetailCard";
import NavList from "../NavList";

type Props = {};

const item_list = [
  {
    //   icon: MessageSquareTextIcon,
    count: 5,
    label: "Username",
    desc: "@johndoe_2020",
    href: "username",
  },
  {
    //   icon: Ban,
    count: 5,
    label: "Phone",
    desc: "+234 700 000 0000",
    href: "phone",
  },
  {
    //   icon: Ban,
    count: 5,
    label: "Change password",
    desc: "You can change your password at anytime",
    href: "change-password",
  },
  {
    //   icon: Ban,
    count: 5,
    label: "Email",
    desc: "Johndoe@yahoo.com",
    href: "email",
  },
  {
    //   icon: Ban,
    count: 5,
    label: "Country",
    desc: "Nigeria",
    href: "country",
  },
  {
    //   icon: Ban,
    count: 5,
    label: "Deactivate or delete account",
    desc: "Temporarily deactivate or permanently delete your Foniso account",
    href: "delete-account",
  },
];

const YourAccount = (props: Props) => {
  return (
    <div className="mt-5 min-h-screen bg-background">
      {item_list.slice(0, 5).map(({ count, desc, href, label }) => (
        <DetailCard
          key={label}
          label={label}
          href={href as string}
          // count={generateCount(href ?? "")}
          desc={desc}
        />
      ))}
      <NavList
        key={item_list[5].label}
        label={item_list[5].label}
        href={item_list[5].href as string}
        // count={generateCount(href ?? "")}
        desc={item_list[5].desc}
        removePadding
      />
    </div>
  );
};

export default YourAccount;
