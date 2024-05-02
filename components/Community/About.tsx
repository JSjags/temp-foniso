import { HiLockClosed } from "react-icons/hi2";
import { CiGlobe } from "react-icons/ci";
import { FaCalendarDay } from "react-icons/fa";
import { communityRules } from "@/constants";
import { CommunityContext } from "@/types/community";
import dayjs from "dayjs";

const About = ({ info }: { info: CommunityContext }) => {
  return (
    <div className="space-y-5">
      <div className="pb-5 border-b border-border">
        <p className="text-[20px] font-bold">Description</p>
        <p className="text-black dark:text-[#AFAFAF] mt-2">
          {info.description}
        </p>
      </div>
      <div className="pb-5 border-b border-border">
        <p className="text-[20px] font-bold">Community info</p>
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2 text-sm duo:text-base">
            {info.type === "private" ? (
              <>
                <HiLockClosed className="fill-black dark:fill-[#C8C8C8]" />
                <span className="">
                  Community is private. You need to be approved to join
                </span>
              </>
            ) : (
              <>
                <CiGlobe className="fill-black dark:fill-[#C8C8C8]" />
                <span className="">
                  Community is public. You can join right away.
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm duo:text-base">
            <FaCalendarDay className="fill-black dark:fill-[#C8C8C8]" />
            <span className="">
              Created on {dayjs(info.created_at).format("DD MMM YYYY")} by{" "}
              <span className=" text-colorPrimary font-semibold">
                @{info.user.username}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="pb-5 border-b border-border">
        <p className="text-[20px] font-bold">Community rules</p>
        <ul className="mt-3 space-y-[18px]">
          {info.rules.map(({ title, description, id }, index) => (
            <li key={id} className="flex">
              <p className="mr-3 text-center font-bold text-lg leading-none">
                {index + 1}
              </p>
              <div>
                <p className="!leading-none font-bold duo:text-lg">{title}</p>
                <p className="text-black dark:text-[#AFAFAF] text-sm duo:text-base mt-1">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="pb-5 border-b border-border">
        <p className="text-[20px] font-bold">Moderators</p>
        <p className="mt-2 text-[#DADADA] text-lg">{info.moderators.length}</p>
      </div>

      <div className="pb-5 border-b border-border">
        <p className="text-[20px] font-bold">Community members</p>
        <p className="mt-2 text-[#DADADA] text-lg">
          {info.memberCount.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default About;
