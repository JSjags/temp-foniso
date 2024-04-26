import MembersList from "@/components/Community/MembersList";
import HeaderWithBackBtn from "@/components/reusable/HeaderWithBackBtn";
import RightSideBar from "@/components/RightSideBar";

const Page = () => {
  return (
    <div className="flex duo:gap-3 duo:pr-2">
      <div className="w-full">
        <HeaderWithBackBtn title="Invite new members" />
        <MembersList />
      </div>

      <RightSideBar className="min-w-[300px] lg:min-w-[380px]" />
    </div>
  );
};

export default Page;
