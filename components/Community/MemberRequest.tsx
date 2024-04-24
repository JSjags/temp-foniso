import Image from "next/image";
import { Button } from "../ui/button";
import MemberCard from "./MemberCard";

const MemberRequest = () => {
  return (
    <div>
      {"123".split("").map((item) => (
        <div key={item} className="py-4 border-b border-border">
          <MemberCard
            avatar="https://source.unsplash.com/random/120x120/?portrait"
            name="StoneSilver12"
            username="@sportsOn3"
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
      ))}
    </div>
  );
};

export default MemberRequest;
