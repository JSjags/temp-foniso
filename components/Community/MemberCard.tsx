import Image from "next/image";

type Props = {
  avatar: string;
  name: string;
  username: string;
  interest?: Array<string>;
};

const MemberCard = (props: Props) => {
  return (
    <div className="flex gap-[18px]">
      <div className="size-10 duo:size-[50px] rounded-full relative overflow-hidden">
        <Image src={props.avatar} alt="user" fill />
      </div>

      <div className="">
        <p className="text-lg font-semibold">{props.name}</p>
        <p className="text-sm text-[#676666] dark:text-[#A0A0A0]">
          {props.username}
        </p>
        <p className="text-sm text-[#676666] dark:text-[#A0A0A0]">
          {(props?.interest ?? ["Leicester", "Father", "Sport enthusiasts"])
            .join(",")
            .replace(/,/g, ". ")}
        </p>
      </div>
    </div>
  );
};

export default MemberCard;
