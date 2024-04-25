import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { profileImageplaceholder, suggestedUsers } from "@/constants";
import Image from "next/image";
import axiosInstance from "@/services/api/axiosInstance";
import { RotateSpinner } from "react-spinners-kit";

type Props = {};

const PeopleSuggestions = (props: Props) => {
  const [people, setPeople] = useState<any[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState<boolean>(false);

  const fetchSuggestions = async () => {
    try {
      setIsPeopleLoading(true);
      const res = await axiosInstance.get("/explore/people");
      console.log(res.data.data);
      setPeople(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPeopleLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <div className="text-white py-5 pb-6 pt-2 relative font-bold border-b border-border mt-7">
      <p className="px-6 text-xl text-foreground">People you may like</p>
      <div className="p-6 flex flex-col gap-y-6">
        {isPeopleLoading && (
          <div className="mt-10 flex justify-center">
            <RotateSpinner
              size={30}
              color="#188C43"
              loading={isPeopleLoading}
            />
          </div>
        )}
        {Boolean(people && people.length) &&
          people.slice(0, 5).map((user, i) => (
            <div
              key={i}
              className="flex justify-between gap-4 gap-y-0 items-center flex-wrap"
            >
              <div className="flex flex-1 gap-4 items-center overflow-hidden min-w-[200px]">
                <Image
                  width={50}
                  height={50}
                  className="size-[50px] rounded-full object-cover"
                  alt="icon"
                  src={
                    user?.usermeta?.avatar !== null
                      ? user?.usermeta?.avatar
                      : profileImageplaceholder
                  }
                />
                <div>
                  <p className="font-bold text-foreground text-lg w-full line-clamp-1 text-ellipsis">
                    {user.usermeta.firstname} {user.usermeta.lastname}
                  </p>
                  <p className="text-lg text-foreground/50 font-normal w-full line-clamp-1 text-ellipsis">
                    @{user.username}
                  </p>
                </div>
              </div>
              <div className="flex-1 flex justify-end mt-1">
                <Button className="flex-1 hover:bg-white hover:scale-[1.01] transition-all hover:shadow-xl bg-white border border-border text-foreground dark:text-black rounded-full flex justify-center items-center h-[40px] px-10 w-full max-w-[135px]">
                  <span className="w-fit text-lg font-medium block p-0 align-middle">
                    Follow
                  </span>
                </Button>
              </div>
            </div>
          ))}
      </div>
      <div className="px-6">
        <Button variant={"link"} className="text-colorPrimary mt-3 p-0 text-lg">
          Show more
        </Button>
      </div>
    </div>
  );
};

export default PeopleSuggestions;
