import CommunityIntro from "@/components/Community/CommunityIntro";
import RightSideBar from "@/components/RightSideBar";

const Page = () => {
  return (
    <div className="flex duo:gap-3">
      <div className="flex-1 h-dvh overflow-y-auto hide-scrollbar">
        <CommunityIntro />
      </div>

      <RightSideBar className="min-w-[200px] w-[40%] max-w-[480px] gap-0 min-[480px]:gap-2" />
      {/* <RightSideBar className="w-full min-w-[300px] lg:min-w-[380px]" /> */}
    </div>
  );
};

export default Page;
