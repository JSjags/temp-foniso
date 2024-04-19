import { HiLockClosed } from "react-icons/hi2";
import { FaCalendarDay } from "react-icons/fa";

const rules = [
  {
    title: "Be civil and respectful",
    desc: "Make sure you understand the full picture before responding to someone's post",
  },
  {
    title: "Stay on topic",
    desc: "Share content that aligns with the community&apo;s theme.",
  },
  {
    title: "Report issues",
    desc: "Report any concerns to moderators or administrators promptly.",
  },
];

const About = () => {
  return (
    <div className="space-y-5">
      <div className="pb-5 border-b border-border">
        <p className="text-[20px] font-bold">Description</p>
        <p className="text-black dark:text-[#AFAFAF] mt-2">
          Welcome to the Red Devils&aps; Haven! Join our passionate community of
          Manchester United fans. Haven! Join our passionate community of
          Manchester United fans. Haven! Join our passionate community of
          Manchester United fans.
        </p>
      </div>
      <div className="pb-5 border-b border-border">
        <p className="text-[20px] font-bold">Community info</p>
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2 text-sm duo:text-base">
            <HiLockClosed className="fill-black dark:fill-[#C8C8C8]" />
            <span className="">
              Community is private. You need to be approved to join
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm duo:text-base">
            <FaCalendarDay className="fill-black dark:fill-[#C8C8C8]" />
            <span className="">
              Created on 23 Apr 23 by{" "}
              <span className=" text-colorPrimary font-semibold">@Johndoe</span>
            </span>
          </div>
        </div>
      </div>
      <div className="pb-5 border-b border-border">
        <p className="text-[20px] font-bold">Community rules</p>
        <ul className="mt-3 space-y-[18px]">
          {rules.map(({ title, desc }, index) => (
            <li key={title} className="flex">
              <p className="mr-3 text-center font-bold text-lg leading-none">
                {index + 1}
              </p>
              <div>
                <p className="!leading-none font-bold duo:text-lg">{title}</p>
                <p className="text-black dark:text-[#AFAFAF] text-sm duo:text-base mt-1">
                  {desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="pb-5 border-b border-border">
        <p className="text-[20px] font-bold">Moderators</p>
        <p className="mt-2 text-[#DADADA] text-lg">3</p>
      </div>

      <div className="pb-5 border-b border-border">
        <p className="text-[20px] font-bold">Community members</p>
        <p className="mt-2 text-[#DADADA] text-lg">3,478</p>
      </div>
    </div>
  );
};

export default About;
