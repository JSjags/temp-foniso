import { getFavoriteSports } from "@/services/api/explore";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "./Loading";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";
import Image from "next/image";
import Post from "./Post";
import SportIcon from "./SportIcon";

type Props = {};

const FavoritePosts = (props: Props) => {
  const favoriteSports: any = useQuery({
    queryKey: ["favorite-sports"],
    queryFn: getFavoriteSports,
  });
  console.log(favoriteSports.data);
  console.log(favoriteSports?.data?.data.data);

  if (favoriteSports.isLoading) return <PageLoadingSpinner />;
  if (favoriteSports.isSuccess && Boolean(favoriteSports.data.data.data.length))
    return favoriteSports.data.data.data.map(
      (favoriteSport: any, i: number) => (
        <div key={i} className="border-b border-border">
          <p className="text-foreground font-bold px-2 sm:px-6 text-2xl py-6 pb-4 flex gap-x-2 items-center">
            <SportIcon
              category={favoriteSport.favoriteSport.split("-").join(" ")}
              size={30}
            />
            <span>{favoriteSport.favoriteSport}</span>
          </p>
          <div className="flex flex-col gap-y-2 ">
            {favoriteSport.posts.map((post: any, i: number) => (
              <Post key={i} post={post} />
            ))}
          </div>
        </div>
      )
    );
};

export default FavoritePosts;
