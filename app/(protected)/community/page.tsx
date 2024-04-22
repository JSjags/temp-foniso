import CommunitiesList from "@/components/Community/CommunitiesList";
import OngoingBuzz from "@/components/Community/OngoingBuzz";
import PendingRequests from "@/components/Community/PendingRequests";
import Titlebar from "@/components/Community/Titlebar";
import RightSideBar from "@/components/RightSideBar";

const Community = () => {
  return (
    <div className="flex duo:gap-3">
      <div className="w-full">
        <Titlebar />
        <div className="px-4">
          <PendingRequests count={12} />
          <CommunitiesList />
          <OngoingBuzz />
        </div>
      </div>

      <RightSideBar className="min-w-[300px] lg:min-w-[380px]" />
    </div>
  );
};

export default Community;
