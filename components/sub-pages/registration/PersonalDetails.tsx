import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

type Props = {};

const PersonalDetails = (props: Props) => {
  return (
    <div className="w-full max-w-[571px] p-6 pb-8 pt-4 border border-border bg-background rounded-xl mt-6 mb-20">
      <Image
        alt="foniso logo mt-4"
        src={"/assets/favicon.svg"}
        width={40}
        height={40}
        className="block mx-auto size-[40px] mt-2"
      />
      <h2 className="text-xl sm:text-[24px] text-center font-bold text-foreground mb-4 mt-4">
        Personal information
      </h2>
      <div className="flex flex-col sm:flex-row gap-x-5">
        <div className="mt-4 w-full">
          <Label
            htmlFor="firstName"
            className="text-foreground text-base font-semibold"
          >
            First name
          </Label>
          <Input
            id="email"
            placeholder=""
            className="bg-transparent mt-2 border-foreground/50 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold"
          />
        </div>
        <div className="mt-4 w-full">
          <Label
            htmlFor="lastName"
            className="text-foreground text-base font-semibold"
          >
            Last name
          </Label>
          <Input
            id="email"
            placeholder=""
            className="bg-transparent mt-2 border-foreground/50 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-x-5">
        <div className="mt-4 w-full">
          <Label
            htmlFor="DateOfBirth"
            className="text-foreground text-base font-semibold"
          >
            Date of Birth
          </Label>
          <Input
            id="dateOfBirth"
            placeholder="dd-mm-yy"
            className="bg-transparent mt-2 border-foreground/50 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold"
          />
        </div>
        <div className="mt-4 w-full">
          <Label
            htmlFor="sex"
            className="text-foreground text-base font-semibold mt-8"
          >
            Sex
          </Label>
          <Select>
            <SelectTrigger
              id="sex"
              className="w-full mt-2 text-foreground/50 bg-transparent border-foreground/50 h-[54px] font-semibold"
            >
              <SelectValue
                placeholder="Select"
                className="text-foreground text-base text-semibold placeholder:text-foreground/50 font-semibold"
                color="white"
              />
            </SelectTrigger>
            <SelectContent className="bg-background border-border mt-4">
              <SelectItem
                className="py-2 text-base text-foreground/50 font-semibold data-[highlighted]:text-background"
                value="light"
              >
                Male
              </SelectItem>
              <SelectItem
                className="py-2 text-base text-foreground/50 font-semibold data-[highlighted]:text-background"
                value="dark"
              >
                Female
              </SelectItem>
              <SelectItem
                className="py-2 text-base text-foreground/50 font-semibold data-[highlighted]:text-background"
                value="system"
              >
                Prefer not to choose
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4">
        <Label
          htmlFor="favorite sport"
          className="text-foreground text-base font-semibold mt-8"
        >
          Select your favorite sport
        </Label>
        <Select>
          <SelectTrigger className="w-full mt-2 text-foreground/50 bg-transparent border-foreground/50 h-[54px] font-semibold">
            <SelectValue
              placeholder="Select sport"
              className="text-foreground text-base text-semibold placeholder:text-foreground/50 font-semibold"
              color="white"
            />
          </SelectTrigger>
          <SelectContent className="bg-background border-border mt-4">
            <SelectItem
              className="py-2 text-base text-foreground/50 font-semibold data-[highlighted]:text-background"
              value="light"
            >
              Football
            </SelectItem>
            <SelectItem
              className="py-2 text-base text-foreground/50 font-semibold data-[highlighted]:text-background"
              value="dark"
            >
              Basketball
            </SelectItem>
            <SelectItem
              className="py-2 text-base text-foreground/50 font-semibold data-[highlighted]:text-background"
              value="system"
            >
              Cricket
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        // onClick={() => router.push("/home")}
        className="w-full hover:bg-background hover:scale-[1.01] transition-all hover:shadow-xl bg-foreground border border-border hover:text-foreground text-background rounded-full flex justify-center items-center mt-10 h-[54px]"
      >
        <span className="text-base font-bold block p-0 align-middle -translate-y-[2px]">
          Continue
        </span>
      </Button>
      <Button
        // onClick={() => router.push("?tab=set-password")}
        variant={"link"}
        className="w-full transition-all text-foreground rounded-full flex justify-center items-center mt-0 h-[54px]"
      >
        <span className="text-base font-bold block p-0 align-middle -translate-y-[2px]">
          Go back
        </span>
      </Button>
    </div>
  );
};

export default PersonalDetails;
