import Image from "next/image";
import { CiGlobe } from "react-icons/ci";

const ChooseDestination = () => {
  return (
    <div>
      <p className="text-[20px] font-bold">Choose destination</p>
      <div className="mt-9">
        <div className="flex items-center gap-3">
          <div className="size-[35px] center-item bg-[#188C43] rounded-xl">
            <CiGlobe className="text-2xl text-white" />
          </div>
          <span className="">Public</span>
        </div>

        <div className="mt-[34px]">
          <p className="text-lg font-bold">My communities</p>
          <div className="space-y-[30px] py-[10px]">
            {[0, 1].map((item) => (
              <button
                key={item}
                type="button"
                className="flex gap-[10px] items-center"
              >
                <span className="size-[35px] rounded-lg overflow-hidden">
                  <Image
                    src="https://source.unsplash.com/random/120x120/?community"
                    alt="community"
                    width={35}
                    height={35}
                  />
                </span>
                <span className="text-sm font-semibold dark:text-[#C8C8C8]">
                  Manchester united
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseDestination;
