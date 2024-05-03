"use client";

import { pendingRequests } from "@/services/api/community";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

const PendingRequests = () => {
  const { data } = useQuery({
    queryKey: ["pending-requests"],
    queryFn: () => pendingRequests(),
  });

  return (
    <div className="mt-5 flex items-center justify-between gap-[9px] border rounded-xl border-border p-[10px]">
      <Link
        href="/community/pending-requests"
        className="flex items-center gap-[10px]"
      >
        <div className="size-10 center-item bg-[#1D3928] rounded-[9.6px]">
          <Image
            width={24}
            height={24}
            alt="hour glass loader"
            src="/assets/filled/hour-glass.svg"
          />
        </div>
        <span className="text-base duo:text-lg font-bold max-[480px]:medium">
          Pending requests
        </span>
      </Link>

      <span className="font-bold"> {(data && data?.length) ?? 0} </span>
    </div>
  );
};

export default PendingRequests;
