"use client";

import { communityRules } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { IoIosAddCircle } from "react-icons/io";

const ReviewRules = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  const openModal = (arg?: number) => {
    push(
      `${pathname}?rule=new${typeof arg === "number" ? `&edit=${arg}` : ""}`
    );
  };

  return (
    <div className="mt-5 px-[15px] duo:px-5">
      <p className="text-[#676666] dark:text-[#888888]">
        Clearly defined rules play a key role in promoting respectful
        participation. Here are 3 basic rules we added for starters,you can edit
        and add more! Communities can have up to 10 rules.
      </p>

      <ul className="mt-5 space-y-[18px]">
        {communityRules.map(({ title, desc }, index) => (
          <li key={title} className="flex">
            <p className="mr-3 text-center font-bold text-lg leading-none">
              {index + 1}
            </p>
            <div className="flex-1">
              <p className="!leading-none font-bold duo:text-lg">{title}</p>
              <p className="text-black dark:text-[#AFAFAF] text-sm duo:text-base mt-1">
                {desc}
              </p>
            </div>
            <button
              type="button"
              className="text-[#22C55E] font-medium"
              onClick={() => openModal(index)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="flex w-fit mx-auto mt-9 text-[#22C55E] font-medium"
        onClick={() => openModal()}
      >
        Add new rule
        <IoIosAddCircle className="w-6 h-6 fill-[#22C55E] ml-[2px]" />
      </button>
    </div>
  );
};

export default ReviewRules;
