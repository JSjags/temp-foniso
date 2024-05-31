import PageLoadingSpinner from "@/components/Spinner/PageLoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import validator from "validator";

type Props = {
  email: string;
  submitPassword: UseMutationResult<AxiosResponse<any, any>, any, any, unknown>;
};

const SetPassword = ({ email, submitPassword }: Props) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const checkIfPasswordsMatch = () => {
    // reset confirm password error before checking
    setConfirmPasswordError("");
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    }
  };

  const isValid =
    validator.isStrongPassword(password, {
      minLength: 8,
      minSymbols: 1,
      minNumbers: 1,
      minUppercase: 0,
      minLowercase: 0,
    }) && password === confirmPassword;

  const handlePasswordSubmit = () => {
    submitPassword.mutate({
      password_confirmation: confirmPassword,
      email,
      password,
    });
  };

  return (
    <div className="w-full max-w-[571px] p-6 pb-8 pt-4 border border-border bg-background rounded-xl mt-6 mb-20">
      <h2 className="text-xl sm:text-[24px] text-center font-bold text-foreground mb-4">
        Create a password
      </h2>
      <p className="text-foreground/50 text-center mx-auto max-w-[360px]">
        Secure your account by creating a password you will always remember.
      </p>
      <div className="mt-6">
        <Input
          id="password"
          placeholder="Enter password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="bg-transparent mt-2 border-foreground/50 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold"
        />
      </div>
      <div className="mt-4">
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyUp={() => {
            if (confirmPasswordError) {
              checkIfPasswordsMatch();
            }
          }}
          onBlur={checkIfPasswordsMatch}
          className="bg-transparent mt-2 border-foreground/50 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold"
        />
        {confirmPasswordError && (
          <p className="text-sm text-red-500 mt-1">{confirmPasswordError}</p>
        )}
      </div>
      <div className="flex gap-x-1 items-center justify-start mt-2">
        <span className="text-small text-foreground/50">
          Password strength:{" "}
        </span>
        {!validator.isStrongPassword(password) ? (
          <span className="text-small text-red-500 font-bold">Weak</span>
        ) : (
          <span className="text-small text-green-500 font-bold">Strong</span>
        )}
      </div>

      <p className="text-foreground/50 mt-4 text-base">
        Password must be at least 8 characters, contain a number and a symbol
      </p>

      <Button
        disabled={!isValid}
        onClick={handlePasswordSubmit}
        className="group w-full hover:scale-[1.01] transition-all hover:shadow-xl bg-foreground text-background border border-border rounded-full flex justify-center items-center mt-10 h-[54px]"
      >
        {submitPassword.isPending ? (
          <PageLoadingSpinner spinnerExtraClass="w-7 h-7" />
        ) : (
          <span className="text-base font-bold block p-0 align-middle -translate-y-[2px]">
            Continue
          </span>
        )}
      </Button>
      <Button
        onClick={() => router.push("?tab=username")}
        variant={"link"}
        className="w-full transition-all rounded-full flex justify-center items-center mt-0 h-[54px]"
      >
        <span className="text-base font-bold block p-0 align-middle -translate-y-[2px]">
          Go back
        </span>
      </Button>
    </div>
  );
};

export default SetPassword;
