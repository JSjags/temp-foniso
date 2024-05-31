// import React, { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import { profileImageplaceholder, suggestedUsers } from "@/constants";
// import Image from "next/image";
// import axiosInstance from "@/services/api/axiosInstance";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { peopleSuggestions } from "@/services/api/explore";
// import { User } from "@/types";
// import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";
// import UserSuggestionCard from "./UserSuggestionCard";
// import { getFollowing } from "@/services/api/userService";
// import { filterOutFollowing } from "@/utils";

// type Props = {};

// const PeopleSuggestions = (props: Props) => {
//   const [people, setPeople] = useState<any[]>([]);
//   const [isPeopleLoading, setIsPeopleLoading] = useState<boolean>(false);

//   const fetchSuggestions = useQuery({
//     queryKey: ["suggested-follows"],
//     queryFn: peopleSuggestions,
//   });

//   const following = useQuery({
//     queryKey: ["user-following"],
//     queryFn: getFollowing,
//   });

//   const [filteredFollowers, setFilteredFollowers] = useState<User[]>([]);

//   useEffect(() => {
//     if (following.isSuccess && fetchSuggestions.isSuccess) {
//       setFilteredFollowers(
//         filterOutFollowing(
//           fetchSuggestions.data?.data.data,
//           following.data?.data.data
//         )
//       );
//     }
//   }, [
//     following.isSuccess,
//     following.data?.data.data,
//     fetchSuggestions.data?.data.data,
//     fetchSuggestions.isSuccess,
//   ]);

//   console.log(
//     filterOutFollowing(
//       fetchSuggestions.data?.data.data,
//       following.data?.data.data
//     )
//   );

//   return (
//     <div className="text-white py-5 pb-6 pt-2 relative font-bold border-b border-border mt-7">
//       <p className="px-6 text-xl text-foreground">People you may like</p>
//       <div className="p-6 flex flex-col gap-y-6">
//         {(fetchSuggestions.isLoading ||
//           fetchSuggestions.isPending ||
//           following.isLoading) && (
//           <div className="mt-10 flex justify-center">
//             <PageLoadingSpinner spinnerExtraClass="w-7 h-7" />
//           </div>
//         )}
//         {Boolean(
//           fetchSuggestions.isSuccess &&
//             following.isSuccess &&
//             fetchSuggestions.data?.data.data &&
//             fetchSuggestions.data?.data.data.length
//         ) &&
//           filteredFollowers
//             .slice(0, 5)
//             .map((user: User, i: number) => (
//               <UserSuggestionCard user={user} key={i} />
//             ))}
//       </div>
//       <div className="px-6">
//         <Button
//           variant={"link"}
//           className="text-colorPrimary mt-3 p-0 text-base"
//         >
//           Show more
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default PeopleSuggestions;

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { profileImageplaceholder, suggestedUsers } from "@/constants";
import Image from "next/image";
import axiosInstance from "@/services/api/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { peopleSuggestions } from "@/services/api/explore";
import { User } from "@/types";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";
import UserSuggestionCard from "./UserSuggestionCard";
import { getFollowing } from "@/services/api/userService";
import { filterOutFollowing } from "@/utils";

type Props = {};

const PeopleSuggestions = (props: Props) => {
  const [people, setPeople] = useState<any[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState<boolean>(false);

  const fetchSuggestions = useQuery({
    queryKey: ["suggested-follows"],
    queryFn: peopleSuggestions,
  });

  const following = useQuery({
    queryKey: ["user-following"],
    queryFn: getFollowing,
  });

  const [filteredFollowers, setFilteredFollowers] = useState<User[]>([]);

  useEffect(() => {
    if (following.isSuccess && fetchSuggestions.isSuccess) {
      setFilteredFollowers(
        filterOutFollowing(
          fetchSuggestions.data?.data?.data || [],
          following.data?.data?.data || []
        )
      );
    }
  }, [
    following.isSuccess,
    fetchSuggestions.isSuccess,
    following.data?.data?.data,
    fetchSuggestions.data?.data?.data,
  ]);

  console.log(
    filterOutFollowing(
      fetchSuggestions.data?.data?.data || [],
      following.data?.data?.data || []
    )
  );

  return (
    <div className="text-white py-5 pb-6 pt-2 relative font-bold border-b border-border mt-7">
      <p className="px-6 text-xl text-foreground">People you may like</p>
      <div className="p-6 flex flex-col gap-y-6">
        {(fetchSuggestions.isLoading ||
          fetchSuggestions.isPending ||
          following.isLoading) && (
          <div className="mt-10 flex justify-center">
            <PageLoadingSpinner spinnerExtraClass="w-7 h-7" />
          </div>
        )}
        {Boolean(
          fetchSuggestions.isSuccess &&
            following.isSuccess &&
            fetchSuggestions.data?.data?.data &&
            fetchSuggestions.data?.data?.data.length
        ) && filteredFollowers.slice(0, 5).length > 0 ? (
          filteredFollowers
            .slice(0, 5)
            .map((user: User, i: number) => (
              <UserSuggestionCard user={user} key={i} />
            ))
        ) : (
          <div>
            <p className="text-center font-bold text-foreground text-base sm:text-lg">
              Nothing to see here
            </p>
            <p className="text-center font-normal text-foreground/70 mt-2 text-xs sm:text-sm">
              Looks like we&apos;ve run out of suggestions.
            </p>
          </div>
        )}
      </div>
      <div className="px-6">
        <Button
          variant={"link"}
          className="text-colorPrimary mt-3 p-0 text-base"
        >
          Show more
        </Button>
      </div>
    </div>
  );
};

export default PeopleSuggestions;
