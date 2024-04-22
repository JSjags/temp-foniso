import Image from "next/image";
import Link from "next/link";

const PendingRequests = ({ count }: { count: number }) => {
  return (
    <div className="mt-5 flex items-center justify-between gap-[9px] border rounded-xl border-border p-[10px]">
      <Link
        href="/community/7637238-3824832-87428/pending-requests"
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

      <span className=" font-bold"> {count} </span>
    </div>
  );
};

export default PendingRequests;
