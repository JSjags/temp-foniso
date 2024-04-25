import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { CircleCheckBig } from "lucide-react";
import { useState } from "react";
import { RotateSpinner } from "react-spinners-kit";

type Props = {
  email: string;
  submitUsername: UseMutationResult<AxiosResponse<any, any>, any, any, unknown>;
};

const SetUsername = ({ email, submitUsername }: Props) => {
  const [username, setUsername] = useState("");

  return (
    <div className="w-full max-w-[571px] p-6 pb-8 pt-4 border border-border bg-background rounded-xl mt-6 mb-20">
      <h2 className="text-[24px] text-center font-bold text-foreground mb-4">
        Choose a username
      </h2>
      <p className="text-foreground/50 text-center mx-auto max-w-60">
        Personalize Your Experience with a Unique Username!
      </p>
      <div className="mt-4">
        <Input
          id="username"
          placeholder="johndoe123"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-transparent mt-2 border-foreground/50 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold"
        />
      </div>
      {/* <div className="flex gap-x-1 items-center justify-start mt-2">
        <CircleCheckBig size={14} className="text-green-500" />
        <span className="text-small text-green-500">Good to go</span>
      </div> */}

      <Button
        disabled={username.length < 1}
        onClick={() => submitUsername.mutate({ email, username })}
        className="w-full hover:bg-foreground hover:scale-[1.01] transition-all hover:shadow-xl bg-foreground border border-border text-background rounded-full flex justify-center items-center mt-10 h-[54px]"
      >
        {submitUsername.isPending ? (
          <RotateSpinner
            size={30}
            color="#188C43"
            loading={submitUsername.isPending}
          />
        ) : (
          <span className="text-base font-bold block p-0 align-middle -translate-y-[2px]">
            Continue
          </span>
        )}
      </Button>
    </div>
  );
};

export default SetUsername;
