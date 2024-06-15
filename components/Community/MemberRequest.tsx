"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import MemberCard from "./MemberCard";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { singleCommunityPendingRequests } from "@/services/api/community";
import { User } from "@/types";
import { profileImageplaceholder } from "@/constants";

const MemberRequest = ({ requests }: { requests: User[] }) => {
  console.log(requests);
  return (
    <div>
      {Boolean(requests.length) ? (
        requests.map((item, index) => (
          <div key={index} className="py-4 border-b border-border">
            <MemberCard
              avatar={item.usermeta.avatar ?? profileImageplaceholder}
              name={item.usermeta.firstname + " " + item.usermeta.lastname}
              username={item.username}
            />

            <div className="flex gap-[10px] mt-3">
              <Button className="bg-[#C8C8C8] dark:bg-[#1A1314] text-[#D13D51] text-sm font-semibold rounded-full w-[110px] h-8">
                Deny
              </Button>
              <Button className="bg-[#1A1314] dark:bg-[#222623] text-[#FAFAFA] text-sm font-semibold rounded-full w-[110px] h-8">
                Approve
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <div className="px-4 w-full justify-center pt-10">
            <div className="text-center text-lg font-bold">
              No Pending Request
            </div>
            <div className="text-center text-sm text-foreground/70">
              You haven't received any requests to join this community.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberRequest;
