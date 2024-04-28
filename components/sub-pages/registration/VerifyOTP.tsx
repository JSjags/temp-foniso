import ErrorToast from "@/components/reusable/toasts/ErrorToast";
import SuccessToast from "@/components/reusable/toasts/SuccessToast";
import PageLoadingSpinner from "@/components/Spinner/PageLoadingSpinner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axiosInstance from "@/services/api/axiosInstance";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import VerificationInput from "react-verification-input";

type Props = {
  email: string;
  submitOTP: UseMutationResult<AxiosResponse<any, any>, any, any, unknown>;
};

const VerifyOTP = ({ email, submitOTP }: Props) => {
  let interval = useRef<NodeJS.Timeout | null>(null);

  const [timer, setTimer] = useState(60);

  const resendOTP = useMutation({
    mutationKey: ["resend-otp"],
    mutationFn: () =>
      axiosInstance.post("/auth/resend-otp?reason=VERIFY", {
        email,
      }),
    onError: (error: any) => {
      toast.custom((t) => (
        <ErrorToast
          t={t}
          message={
            error?.response?.data?.message ??
            "Couldn't resend OTP at the moment."
          }
        />
      ));
    },
    onSuccess: (data) => {
      setTimer(60);
      toast.custom((t) => (
        <SuccessToast t={t} message={"OTP resent successfully."} />
      ));
    },
  });

  useEffect(() => {
    interval.current = setInterval(() => {
      if (timer <= 0) {
        if (interval.current) {
          clearInterval(interval.current);
        }
        interval.current = null;
      } else {
        setTimer((prev) => prev - 1);
      }
    }, 1000);

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [timer]);

  return (
    <div className="w-full max-w-[571px] p-6 pb-8 pt-4 border border-border bg-background rounded-xl mt-6 mb-20">
      <h2 className="text-xl sm:text-[24px] text-center font-bold text-foreground mb-4">
        Verify your email address
      </h2>
      <p className="text-foreground/50 text-center mx-auto max-w-60">
        We have sent a 6-digit code to{" "}
        <span className="text-foreground font-bold">{email}</span>. Enter the
        code below
      </p>
      <div className="flex justify-center mt-10">
        <VerificationInput
          classNames={{
            container: "max-w-[360px] min-w-[240px] w-full",
            character:
              "bg-foreground/10 size-[50px_!important] flex justify-center items-center border-border rounded text-foreground font-semibold text-base",
            characterInactive: "character--inactive",
            characterSelected: "border-colorWhite",
            characterFilled: "character--filled",
          }}
          onComplete={(value) =>
            submitOTP.mutate({
              email: email,
              otp: value,
            })
          }
        />
      </div>

      <div className="text-foreground/50 mt-4 text-base">
        <span className="">Didn’t get code the code? </span>
        {timer >= 1 ? (
          <span>
            <span className="">Resend new code in</span>
            <span className="transition-all inline-flex justify-center items-center p-0">
              <span className="text-base text-foreground font-bold block p-0 align-middle">
                {" "}
                : {timer}
              </span>
            </span>
          </span>
        ) : (
          <Button
            variant={"ghost"}
            className={cn(
              "bg-transparent hover:bg-transparent px-0 py-0 h-fit text-foreground hover:text-colorPrimary"
            )}
            onClick={() => resendOTP.mutate()}
          >
            {resendOTP.isPending ? (
              <PageLoadingSpinner spinnerExtraClass="w-7 h-7" />
            ) : (
              <span className="font-bold">Resend OTP</span>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default VerifyOTP;
