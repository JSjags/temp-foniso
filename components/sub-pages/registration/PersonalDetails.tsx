import { MyComboBox } from "@/components/reusable/ComboBox";
import ErrorToast from "@/components/reusable/toasts/ErrorToast";
import SuccessToast from "@/components/reusable/toasts/SuccessToast";
import PageLoadingSpinner from "@/components/Spinner/PageLoadingSpinner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { favoriteSports } from "@/constants";
import { useUserContext } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import { submitUserProfile } from "@/services/api/userService";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const PersonalDetails = (props: Props) => {
  const [date, setDate] = useState<Date>();
  const router = useRouter();
  const { userData } = useUserContext();

  console.log(userData);

  const [profile, setProfile] = useState({
    username: "",
    firstName: "",
    lastName: "",
    dateOfBirth: date?.toDateString(),
    sex: "",
    favoriteSport: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    sex: "",
    favoriteSport: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate username
    if (!userData?.user.username) {
      // Validate firstName
      if (profile.firstName.trim() === "") {
        newErrors.firstName = "First name is required";
        isValid = false;
      } else {
        newErrors.firstName = "";
      }
    }

    // Validate lastName
    if (profile.lastName.trim() === "") {
      newErrors.lastName = "Last name is required";
      isValid = false;
    } else {
      newErrors.lastName = "";
    }

    // Validate dateOfBirth
    console.log("date: ", date);
    if (
      date?.toDateString().trim() === "" ||
      date?.toDateString().trim() === undefined
    ) {
      newErrors.dateOfBirth = "Date of birth is required";
      isValid = false;
    } else {
      newErrors.dateOfBirth = "";
    }

    // Validate sex
    if (profile.sex.trim() === "") {
      newErrors.sex = "Sex is required";
      isValid = false;
    } else {
      newErrors.sex = "";
    }

    // Validate favoriteSport
    if (profile.favoriteSport.trim() === "") {
      newErrors.favoriteSport = "Favorite sport is required";
      isValid = false;
    } else {
      newErrors.favoriteSport = "";
    }

    setErrors(newErrors);

    return isValid;
  };

  const submitProfile = useMutation({
    mutationKey: ["submit-profile"],
    mutationFn: (value: any) => submitUserProfile(value),
    onSuccess: () => {
      toast.custom((t) => (
        <SuccessToast t={t} message={"Account setup complete"} />
      ));
      router.push("/home");
    },
    onError: (error: any) => {
      toast.custom((t) => (
        <ErrorToast
          t={t}
          message={
            error?.response?.data?.message ??
            "Couldn't complete your account setup at the moment."
          }
        />
      ));
    },
  });

  const handleProfileSubmission = () => {
    // Validate the form before submitting
    const isValid = validateForm();

    if (isValid) {
      // Submit the form
      const formData = new FormData();

      formData.append("firstname", profile.firstName);
      formData.append("lastname", profile.lastName);
      if (date !== null || date !== undefined) {
        formData.append("dob", format(date!, "dd-MM-yyyy"));
      }
      formData.append("gender", profile.sex);
      formData.append("favorite_sport", profile.favoriteSport);

      if (profile.username) {
        formData.append("username", profile.username);
      }

      submitProfile.mutate(formData);
    } else {
      console.log(errors);
      toast.custom((t) => (
        <ErrorToast
          t={t}
          message={"Form contains errors. Please correct them."}
          id={"account-setup-error"}
        />
      ));
    }
  };

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
      {!userData?.user.username && (
        <div className="mt-4 w-full">
          <Label
            htmlFor="username"
            className="text-foreground text-base font-semibold"
          >
            Username
          </Label>
          <Input
            id="username"
            placeholder="john117"
            value={profile.username}
            onChange={(e) => {
              setProfile((prev) => ({ ...prev, username: e.target.value }));
              if (Object.values(errors).some((error) => error !== "")) {
                validateForm();
              }
            }}
            className="bg-transparent mt-2 border-foreground/50 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold"
          />
          {errors.username && (
            <p className="text-sm mt-1 text-red-500">{errors.username}</p>
          )}
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-x-5">
        <div className="mt-4 w-full">
          <Label
            htmlFor="firstName"
            className="text-foreground text-base font-semibold"
          >
            First name
          </Label>
          <Input
            id="firstName"
            placeholder=""
            value={profile.firstName}
            onChange={(e) => {
              setProfile((prev) => ({ ...prev, firstName: e.target.value }));
              if (Object.values(errors).some((error) => error !== "")) {
                validateForm();
              }
            }}
            className="bg-transparent mt-2 border-foreground/50 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold"
          />
          {errors.firstName && (
            <p className="text-sm mt-1 text-red-500">{errors.firstName}</p>
          )}
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
            value={profile.lastName}
            onChange={(e) => {
              setProfile((prev) => ({ ...prev, lastName: e.target.value }));
              if (Object.values(errors).some((error) => error !== "")) {
                validateForm();
              }
            }}
            className="bg-transparent mt-2 border-foreground/50 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold"
          />
          {errors.lastName && (
            <p className="text-sm mt-1 text-red-500">{errors.lastName}</p>
          )}
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
          {/* const formattedDate = format(date, "dd-MM-yyyy"); */}
          {/* <Input
            id="dateOfBirth"
            placeholder="dd-mm-yy"
            className="bg-transparent mt-2 border-foreground/50 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold"
          /> */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start border-foreground/50 mt-2 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold bg-transparent text-left",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span></span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className=" w-auto p-0 bg-background"
              >
                <Calendar
                  mode="single"
                  captionLayout="dropdown-buttons"
                  selected={date}
                  onSelect={(value) => {
                    setDate(value);
                    if (Object.values(errors).some((error) => error !== "")) {
                      validateForm();
                    }
                  }}
                  fromYear={1900}
                  toYear={new Date().getFullYear() - 13}
                />
              </PopoverContent>
            </Popover>
          </div>
          {errors.dateOfBirth && (
            <p className="text-sm mt-1 text-red-500">{errors.dateOfBirth}</p>
          )}
        </div>
        <div className="mt-4 w-full">
          <Label
            htmlFor="sex"
            className="text-foreground text-base font-semibold mt-8"
          >
            Sex
          </Label>
          <Select
            onValueChange={(value) => {
              setProfile((prev) => ({ ...prev, sex: value }));
              if (Object.values(errors).some((error) => error !== "")) {
                validateForm();
              }
            }}
          >
            <SelectTrigger
              id="sex"
              value={profile.sex}
              className="w-full mt-2 text-foreground bg-transparent border-foreground/50 h-[54px] font-semibold"
            >
              <SelectValue
                placeholder="Select"
                className="text-foreground text-base text-semibold placeholder:text-foreground/50 font-semibold"
                color="white"
              />
            </SelectTrigger>
            <SelectContent className="bg-background border-border mt-4">
              <SelectItem
                className="py-2 text-base text-foreground font-semibold data-[highlighted]:text-foreground"
                value="male"
              >
                Male
              </SelectItem>
              <SelectItem
                className="py-2 text-base text-foreground font-semibold data-[highlighted]:text-foreground"
                value="female"
              >
                Female
              </SelectItem>
              <SelectItem
                className="py-2 text-base text-foreground font-semibold data-[highlighted]:text-foreground"
                value="Prefer not to disclose"
              >
                Prefer not to disclose
              </SelectItem>
              {/* <SelectItem
                className="py-2 text-base text-foreground font-semibold data-[highlighted]:text-foreground"
                value="system"
              >
                Prefer not to say
              </SelectItem> */}
            </SelectContent>
          </Select>
          {errors.sex && (
            <p className="text-sm mt-1 text-red-500">{errors.sex}</p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <Label
          htmlFor="favorite sport"
          className="text-foreground text-base font-semibold mt-8"
        >
          Select your favorite sport
        </Label>
        <MyComboBox
          placeholder="Select favorite sport"
          searchPlaceholder="Search sports"
          selected={profile.favoriteSport}
          extraAction={(value: string) => {
            if (Object.values(errors).some((error) => error !== "")) {
              validateForm();
            }
            setProfile((prev) => {
              return { ...prev, favoriteSport: value };
            });
          }}
          onChange={(value: any) => {
            setProfile((prev) => ({
              ...prev,
              favoriteSport: Array.isArray(value) ? value[0] : value,
            }));
          }}
          options={favoriteSports}
        />
        {errors.favoriteSport && (
          <p className="text-sm mt-1 text-red-500">{errors.favoriteSport}</p>
        )}
      </div>

      <Button
        disabled={submitProfile.isPending}
        onClick={() => handleProfileSubmission()}
        className="w-full hover:bg-foreground hover:scale-[1.01] transition-all hover:shadow-xl bg-foreground border border-border text-background rounded-full flex justify-center items-center mt-6 h-12"
      >
        {submitProfile.isPending ? (
          <PageLoadingSpinner spinnerExtraClass="w-7 h-7" />
        ) : (
          <span className="text-base font-bold block p-0 align-middle -translate-y-[2px]">
            Continue
          </span>
        )}
      </Button>

      {/* <Button
        onClick={() => handleProfileSubmission()}
        className="w-full hover:bg-background hover:scale-[1.01] transition-all hover:shadow-xl bg-foreground border border-border hover:text-foreground text-background rounded-full flex justify-center items-center mt-10 h-[54px]"
      >
        <span className="text-base font-bold block p-0 align-middle -translate-y-[2px]">
          Continue
        </span>
      </Button> */}
      {/* <Button
        // onClick={() => router.push("?tab=set-password")}
        variant={"link"}
        className="w-full transition-all text-foreground rounded-full flex justify-center items-center mt-0 h-[54px]"
      >
        <span className="text-base font-bold block p-0 align-middle -translate-y-[2px]">
          Go back
        </span>
      </Button> */}
    </div>
  );
};

export default PersonalDetails;
