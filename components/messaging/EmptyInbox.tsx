import React, { useState } from "react";
import { Button } from "../ui/button";
import SearchUsers from "./SearchUsers";
import { useQuery } from "@tanstack/react-query";

type Props = {};

const EmptyInbox = (props: Props) => {
  const [showExplore, setShowExplore] = useState(false);

  return (
    <div>
      {showExplore ? (
        <SearchUsers setShowExplore={setShowExplore} />
      ) : (
        <div className="pt-20 px-2">
          <p className="text-center text-lg font-bold">Welcome to messages!</p>
          <p className="text-center text-foreground/60 mx-auto w-4/5 mt-2">
            Chat with your followers about your favorite sports or topics
          </p>
          <Button
            onClick={() => setShowExplore(true)}
            className="mx-auto font-bold flex rounded-full !mt-4"
          >
            Get started
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyInbox;
