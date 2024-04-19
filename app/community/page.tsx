import CommunitiesList from "@/components/Community/CommunitiesList";
import OngoingBuzz from "@/components/Community/OngoingBuzz";
import PendingRequests from "@/components/Community/PendingRequests";
import Titlebar from "@/components/Community/Titlebar";

const Community = () => {
  return (
    <>
      <Titlebar />
      <div className="px-4">
        <PendingRequests count={12} />
        <CommunitiesList />
        <OngoingBuzz />
      </div>
    </>
  );
};

export default Community;
