import RightSideBar from "@/components/RightSideBar";
import HeaderWithBackBtn from "../reusable/HeaderWithBackBtn";
import BuzzCard from "./BuzzCard";

const live_buzz = "0123456".split("").map(() => ({
  name: "Who is the Goat. Messi or Ronaldo?",
  spectators: [
    "https://source.unsplash.com/random/100x100/?lady",
    "https://source.unsplash.com/random/100x100/?man",
    "https://source.unsplash.com/random/100x100/?space",
  ],
  spectatorsCount: 350,
  host: {
    name: "Manchester United FC",
    avatar: "https://source.unsplash.com/random/100x100/?man-united",
  },
}));

const LiveBuzz = () => {
  return (
    <div className="flex duo:gap-3">
      <div className="w-full overflow-hidden">
        <HeaderWithBackBtn title="All Buzz" />

        <div className="mt-6 space-y-5 px-4">
          {live_buzz.map((details, index) => (
            <BuzzCard key={index} details={details} />
          ))}
        </div>
      </div>

      <RightSideBar className="min-w-[300px] lg:min-w-[380px]" />
    </div>
  );
};

export default LiveBuzz;
