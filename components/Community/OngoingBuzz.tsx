import Link from "next/link";
import BuzzCard from "./BuzzCard";

const buzz = [
  {
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
  },
  {
    name: "Who is the Goat. Messi or Ronaldo?",
    spectators: [
      "https://source.unsplash.com/random/100x100/?girl",
      "https://source.unsplash.com/random/100x100/?boy",
      "https://source.unsplash.com/random/100x100/?code",
    ],
    spectatorsCount: 350,
    host: {
      name: "Manchester United FC",
      avatar: "https://source.unsplash.com/random/100x100/?man-united",
    },
  },
];

const OngoingBuzz = () => {
  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <p className="font-bold text-xl duo:text-2xl">Ongoing Buzz</p>
        <Link
          href="/community"
          className="text-[#1FB356] font-medium text-sm duo:text-base"
        >
          See more
        </Link>
      </div>

      <div className="mt-6 space-y-5">
        {buzz.map((details, index) => (
          <BuzzCard key={index} details={details} />
        ))}
      </div>
    </div>
  );
};

export default OngoingBuzz;
