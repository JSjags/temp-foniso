import { getFavoriteSports } from "@/services/api/explore";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "./Loading";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";
import Image from "next/image";
import Post from "./Post";
import SportIcon from "./SportIcon";
import { motion, AnimatePresence } from "framer-motion";

type Props = {};

const FavoritePosts = (props: Props) => {
  const favoriteSports: any = useQuery({
    queryKey: ["favorite-sports"],
    queryFn: getFavoriteSports,
  });
  console.log(favoriteSports.data);
  console.log(favoriteSports?.data?.data.data);

  if (favoriteSports.isLoading)
    return (
      <motion.div
        className="pt-2 sm:pt-6"
        initial={{ opacity: 0, y: 50, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: 50, height: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Loading
          isLoading
          className="w-full min-h-10 pb-5"
          extraClass="size-4 sm:size-8"
        />
      </motion.div>
    );
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
              <Post key={i} postData={post} />
            ))}
          </div>
        </div>
      )
    );
};

export default FavoritePosts;
