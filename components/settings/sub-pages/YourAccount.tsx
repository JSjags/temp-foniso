"use context";

import React, { useEffect, useState } from "react";
import DetailCard from "../DetailCard";
import NavList from "../NavList";
import { useUserContext } from "@/context/UserContext";
import DeleteOrDeactivateModal from "@/components/Modal/DeleteOrDeactivateModal";
import { useSearchParams } from "next/navigation";
import DeactivateModal from "@/components/Modal/DeactivateModal";

type Props = {};

const YourAccount = (props: Props) => {
  const user = useUserContext().userData?.user;
  const searchParams = useSearchParams();

  const [showDeleteOrDeactivateModal, setShowDeleteOrDeactivateModal] =
    useState(searchParams.get("action") === "delete-account");
  const [showDeleteModal, setShowDeleteModal] = useState(
    searchParams.get("action") === "false"
  );
  const [showDeactivateModal, setShowDeactivateModal] = useState(
    searchParams.get("action") === "false"
  );

  const item_list = [
    {
      //   icon: MessageSquareTextIcon,
      count: 5,
      label: "Username",
      desc: user?.username,
      href: "username",
    },
    {
      //   icon: Ban,
      count: 5,
      label: "Phone",
      desc: `${user?.country_code[0] === "+" ? "" : "+"}${user?.country_code} ${
        user?.mobile[0] === "0" ? user?.mobile.slice(1) : user?.mobile
      }`,
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
      desc: user?.email,
      href: "email",
    },
    {
      //   icon: Ban,
      count: 5,
      label: "Country",
      desc: user?.country,
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

  useEffect(() => {
    setShowDeleteOrDeactivateModal(
      searchParams.get("action") === "delete-account"
    );
  }, [searchParams]);

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
        setter={setShowDeleteOrDeactivateModal}
      />

      <DeleteOrDeactivateModal
        showDeleteOrDeactivateModal={showDeleteOrDeactivateModal}
        setShowDeleteOrDeactivateModal={setShowDeleteOrDeactivateModal}
        setShowDeleteModal={setShowDeleteModal}
        setShowDeactivateModal={setShowDeactivateModal}
      />
      <DeactivateModal
        showDeleteOrDeactivateModal={showDeactivateModal}
        setShowDeleteOrDeactivateModal={setShowDeactivateModal}
        setShowDeleteModal={setShowDeleteModal}
        setShowDeactivateModal={setShowDeactivateModal}
      />
    </div>
  );
};

export default YourAccount;
