"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

const PendingRequestHeader = () => {
  const { back } = useRouter();
  return (
    <div className="flex h-[54px] items-center duo:h-20">
      <button
        type="button"
        className="size-[30px] duo:size-[45px] center-item rounded-full duo:dark:bg-[#222623] duo:bg-gray-100"
        onClick={() => back()}
      >
        <FaArrowLeftLong className="fill-black dark:fill-white text-xl" />
      </button>
      <p className="flex-1 text-center text-xl duo:text-2xl font-bold">
        Pending requests
      </p>
    </div>
  );
};

export default PendingRequestHeader;
