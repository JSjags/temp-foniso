"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const HeaderWithBackBtn = ({
  title,
  hideBorder,
}: {
  title: ReactNode;
  hideBorder?: false;
}) => {
  const { back } = useRouter();
  return hideBorder ? (
    <div className="flex h-[54px] items-center duo:h-20 px-4 mt-2">
      <button
        type="button"
        className="size-[30px] duo:size-[45px] center-item rounded-full duo:dark:bg-[#222623] duo:bg-gray-100"
        onClick={() => back()}
      >
        <FaArrowLeftLong className="fill-black dark:fill-white text-xl" />
      </button>
      <div className="flex-1 text-center text-xl duo:text-2xl font-bold">
        {title}
      </div>
    </div>
  ) : (
    <div className="flex h-[54px] items-center duo:h-20 border-b border-border px-4 mt-2">
      <button
        type="button"
        className="size-[30px] duo:size-[45px] center-item rounded-full duo:dark:bg-[#222623] duo:bg-gray-100"
        onClick={() => back()}
      >
        <FaArrowLeftLong className="fill-black dark:fill-white text-xl" />
      </button>
      <div className="flex-1 text-center text-xl duo:text-2xl font-bold">
        {title}
      </div>
    </div>
  );
};

export default HeaderWithBackBtn;
