import CommunityIntro from "@/components/Community/CommunityIntro";
import RightSideBar from "@/components/RightSideBar";

const Page = () => {
  return (
    <div className="flex duo:gap-3">
      <CommunityIntro />

      <RightSideBar className="min-w-[300px] lg:min-w-[380px]" />
    </div>
  );
};

export default Page;
