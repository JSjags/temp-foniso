import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { GiTick } from "react-icons/gi";
import { CalendarIcon, Check, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { IoArrowBack } from "react-icons/io5";
import { cn } from "@/lib/utils";
import {
  favoriteSports,
  reportReasons,
  userPlaceholderImage,
} from "@/constants";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import readImageAsBase64, { ensureUniqueItemsByKey } from "@/utils";
import { useUserContext } from "@/context/UserContext";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { MyComboBox } from "../reusable/ComboBox";
import { Country, ICountry } from "country-state-city";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTeams, updateProfile } from "@/services/api/userService";
import { TeamData } from "@/types";
import toast from "react-hot-toast";
import SuccessToast from "../reusable/toasts/SuccessToast";
import ErrorToast from "../reusable/toasts/ErrorToast";
import { ImSpinner2 } from "react-icons/im";
import { Switch } from "../ui/switch";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "../ui/credenza";

type Props = {
  showEditProfileDialog: boolean;
  setShowEditProfileDialog: Dispatch<SetStateAction<boolean>>;
};

type ProfileDetailsProps = {
  coverImg: File[];
  profilePic: File[];
  coverImgBase64: string;
  profilePicBase64: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  username: string;
  bio: string;
  location: string;
  dob: string;
  favoriteSport: string;
  favoriteTeam: string;
  displayTag: boolean;
};

const EditProfileDialog = ({
  showEditProfileDialog,
  setShowEditProfileDialog,
}: Props) => {
  const queryClient = useQueryClient();
  const { userData, setUserData, updateUserData } = useUserContext();
  const router = useRouter();

  const [profileDetails, setProfileDetails] = useState<ProfileDetailsProps>({
    coverImg: [],
    coverImgBase64: "",
    profilePic: [],
    profilePicBase64: "",
    firstName: userData?.user.usermeta.firstname ?? "",
    lastName: userData?.user.usermeta.lastname ?? "",
    username: userData?.user.username ?? "",
    bio: userData?.user.usermeta.about ?? "",
    location: userData?.user.country ?? "",
    countryCode: userData?.user.country_code ?? "",
    dob: userData?.user.usermeta.dob ?? "",
    favoriteSport: userData?.user.usermeta.favorite_sport ?? "",
    favoriteTeam: userData?.user.usermeta.favorite_team ?? "",
    displayTag: userData?.user.usermeta.display ?? false,
  });

  const [showFavoriteSportForm, setShowFavoriteSportForm] = useState(false);
  const [query, setQuery] = useState("");

  const [countryData, setCountryData] = useState(Country.getAllCountries());

  const teams = useQuery({
    queryKey: ["get-teams"],
    queryFn: getTeams,
  });

  const profileMutation = useMutation({
    mutationKey: ["update-user-profile"],
    mutationFn: (data: FormData) => updateProfile(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["get-user-profile-data"],
      });
      toast.custom((t) => (
        <SuccessToast t={t} message="Profile updated successfully" />
      ));
      console.log(data);
      console.log(userData);
      updateUserData(data.data.data);
      setShowEditProfileDialog(false);
      setShowFavoriteSportForm(false);
      setProfileDetails({
        coverImg: [],
        coverImgBase64: "",
        profilePic: [],
        profilePicBase64: "",
        firstName: data.data.data.usermeta.firstname ?? "",
        lastName: data.data.data.usermeta.lastname ?? "",
        username: data.data.data.username ?? "",
        bio: data.data.data.usermeta.about ?? "",
        location: data.data.data.country ?? "",
        countryCode: data.data.data.country_code ?? "",
        dob: data.data.data.usermeta.dob ?? "",
        favoriteSport: data.data.data.usermeta.favorite_sport ?? "",
        favoriteTeam: data.data.data.usermeta.favorite_team ?? "",
        displayTag: data.data.data.usermeta.display ?? false,
      });
    },
    onError: () => {
      toast.custom((t) => (
        <ErrorToast t={t} message="Couldn't update profile" />
      ));
    },
  });

  useEffect(() => {
    setProfileDetails({
      coverImg: [],
      coverImgBase64: "",
      profilePic: [],
      profilePicBase64: "",
      firstName: userData?.user.usermeta.firstname ?? "",
      lastName: userData?.user.usermeta.lastname ?? "",
      username: userData?.user.username ?? "",
      bio: userData?.user.usermeta.about ?? "",
      location: userData?.user.country ?? "",
      countryCode: userData?.user.country_code ?? "",
      dob: userData?.user.usermeta.dob ?? "",
      favoriteSport: userData?.user.usermeta.favorite_sport ?? "",
      favoriteTeam: userData?.user.usermeta.favorite_team ?? "",
      displayTag: userData?.user.usermeta.display ?? false,
    });
    router.refresh();
  }, [
    userData?.user.usermeta.avatar,
    userData?.user.usermeta.coverImage,
    userData?.user.usermeta.firstname,
    userData?.user.usermeta.lastname,
    userData?.user.username,
    userData?.user.usermeta.about,
    userData?.user.country,
    userData?.user.country_code,
    userData?.user.usermeta.dob,
    userData?.user.usermeta.favorite_sport,
    userData?.user.usermeta.favorite_team,
    userData?.user.usermeta.display,
    router,
  ]);

  const handleProfileUpdate = () => {
    const formData = new FormData();

    if (profileDetails.coverImg.length) {
      formData.append("coverImage", profileDetails.coverImg[0]);
    }
    if (profileDetails.profilePic.length) {
      // console.log(profileDetails.profilePic[0].name);
      formData.append("avatar", profileDetails.profilePic[0]);
      formData.append("filename", profileDetails.profilePic[0].name);
    }
    if (profileDetails.username !== userData?.user.username) {
      formData.append("username", profileDetails.username);
    }
    if (
      profileDetails.favoriteSport !== userData?.user.usermeta.favorite_sport
    ) {
      formData.append("favorite_sport", profileDetails.favoriteSport);
    }
    if (profileDetails.favoriteTeam !== userData?.user.usermeta.favorite_team) {
      formData.append("favorite_team", profileDetails.favoriteTeam);
    }
    if (profileDetails.displayTag !== userData?.user.usermeta.display) {
      formData.append("display", profileDetails.displayTag.toString());
    }
    if (profileDetails.firstName !== userData?.user.usermeta.firstname) {
      formData.append("firstname", profileDetails.firstName);
    }
    if (profileDetails.lastName !== userData?.user.usermeta.lastname) {
      formData.append("lastname", profileDetails.lastName);
    }
    if (profileDetails.dob !== userData?.user.usermeta.dob) {
      formData.append("dob", profileDetails.dob);
    }
    if (profileDetails.bio !== userData?.user.usermeta.about) {
      formData.append("about", profileDetails.bio);
    }
    if (profileDetails.location !== userData?.user.country) {
      formData.append("country", profileDetails.location);
      formData.append("country_code", profileDetails.countryCode);
    }

    profileMutation.mutate(formData);
  };

  return (
    <Credenza
      open={showEditProfileDialog}
      onOpenChange={(val) => {
        setShowEditProfileDialog(val);
        setShowFavoriteSportForm(false);
      }}
      // modal
    >
      {/* <div className="w-full h-full absolute top-0 left-0 z-50"> */}
      <CredenzaContent className="sm:max-w-[680px] pt-3 px-0 overflow-y-scroll max-h-[90vh] pb-0 rounded-lg">
        <CredenzaHeader className="pt-0 min-[768px]:pt-0">
          {showFavoriteSportForm && (
            <Button
              onClick={() => {
                setShowFavoriteSportForm(false);
              }}
              className="size-8 p-1 z-50 flex justify-center hover:bg-colorPrimary items-center bg-background/70 rounded-full absolute top-4 left-4"
            >
              <IoArrowBack className="text-foreground size-6" />
            </Button>
          )}
          <CredenzaTitle className="text-center -translate-y-3 min-[768px]:translate-y-0 font-bold text-xl sm:text-2xl pb-3 border-b min-[768px]:border-none border-border">
            Edit profile
          </CredenzaTitle>
          <div className="border-b border-border w-full absolute top-12 sm:top-14 left-0 hidden min-[768px]:block"></div>
        </CredenzaHeader>
        <CredenzaDescription className="px-2">
          {showFavoriteSportForm ? (
            <>
              <p className="text-center font-bold text-xl md:text-3xl mt-2 text-foreground">
                Change your favorite sport
              </p>
              <div className="px-4">
                <div className="mt-6 flex justify-between items-center text-foreground text-base md:text-lg font-medium">
                  <p>Display tag profile</p>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={profileDetails.displayTag}
                      onCheckedChange={(value) =>
                        setProfileDetails((prev) => ({
                          ...prev,
                          displayTag: value,
                        }))
                      }
                      id="display-tag"
                    />
                    {/* <Label htmlFor="display-tag">Airplane Mode</Label> */}
                  </div>
                </div>
                <div className="relative mt-6">
                  <SearchIcon
                    size={18}
                    color="#888888"
                    className="absolute left-3 sm:left-4 top-[12px] sm:top-[18px]"
                  />
                  <Input
                    id="search"
                    // ref={inputRef}
                    value={query}
                    placeholder="Search"
                    onChange={(e) => setQuery(e.target.value)}
                    className={cn(
                      "bg-foreground/10 dark:bg-black mt-2 pl-10 text-white border-border h-[40px] sm:h-[54px] text-base placeholder:text-foreground/50 rounded-xl"
                    )}
                  />
                </div>
                <div className="mt-6 flex justify-between items-center text-foreground text-lg font-bold">
                  <p>Suggestions</p>
                </div>
                <div className="mt-4 min-h-fit">
                  <RadioGroup
                    value={profileDetails.favoriteSport}
                    onValueChange={(value) =>
                      setProfileDetails((prev) => ({
                        ...prev,
                        favoriteSport: value,
                      }))
                    }
                  >
                    {favoriteSports
                      .filter((sport) =>
                        sport.label.toLowerCase().includes(query.toLowerCase())
                      )
                      .map((sport, id) => (
                        <div
                          key={id}
                          className="flex items-center space-x-2 py-2 pb-4 justify-between border-b border-border"
                        >
                          <Label
                            htmlFor={sport.value}
                            className="text-foreground text-base"
                          >
                            {sport.label}
                          </Label>

                          <RadioGroupItem
                            value={sport.value}
                            id={sport.value}
                            className="text-brand-primary border-border"
                          />
                        </div>
                      ))}
                  </RadioGroup>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full h-[140px] sm:h-[212px] rounded-lg bg-border relative ">
                <Image
                  alt="cover image"
                  // width={618}
                  // height={213}

                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  src={
                    profileDetails.coverImgBase64
                      ? profileDetails.coverImgBase64
                      : userData?.user.usermeta.coverImage
                      ? userData?.user.usermeta.coverImage
                      : "/assets/default-cover-image.png"
                  }
                />
                {/* cover img button */}
                <Label
                  htmlFor="cover-img-input"
                  className="size-10 cursor-pointer rounded-full bg-foreground p-0 hover:bg-colorPrimary border-4 border-background absolute right-0 bottom-0 translate-y-1/2 flex justify-center items-center"
                >
                  <Image
                    width={32}
                    height={32}
                    alt="edit"
                    className="dark:brightness-50 brightness-200 size-6"
                    src={"/assets/app-icons/edit-image.svg"}
                  />
                </Label>
                <Input
                  className="hidden"
                  type="file"
                  id="cover-img-input"
                  accept="image/*"
                  onChange={(e) => {
                    const files = e.target.files
                      ? Array.from(e.target.files)
                      : [];
                    if (files.length > 0) {
                      readImageAsBase64(files[0]).then((base64) => {
                        setProfileDetails((prev) => ({
                          ...prev,
                          coverImg: files,
                          coverImgBase64: base64,
                        }));
                      });
                    } else {
                      setProfileDetails((prev) => ({
                        ...prev,
                        coverImg: [],
                        coverImgBase64: "",
                      }));
                    }
                  }}
                />

                {/* profile pic */}
                <div className="w-32 h-32 rounded-full absolute left-0 bottom-0 translate-y-1/2 bg-border border-4 border-background">
                  <Image
                    alt="profile image"
                    // width={618}
                    // height={213}

                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                    src={
                      profileDetails.profilePicBase64
                        ? profileDetails.profilePicBase64
                        : userData?.user.usermeta.avatar
                        ? userData?.user.usermeta.avatar
                        : "/assets/placeholder-person.png"
                    }
                  />

                  {/* profile img button */}
                  <Label
                    htmlFor="profile-img-input"
                    className="size-10 rounded-full bg-foreground p-0 hover:bg-colorPrimary border-4 border-background absolute right-0 bottom-0 flex justify-center items-center"
                  >
                    <Image
                      width={32}
                      height={32}
                      alt="edit"
                      className="dark:brightness-50 brightness-200 size-6"
                      src={"/assets/app-icons/edit-image.svg"}
                    />
                  </Label>
                  <Input
                    className="hidden"
                    type="file"
                    id="profile-img-input"
                    accept="image/*"
                    onChange={(e) => {
                      const files = e.target.files
                        ? Array.from(e.target.files)
                        : [];
                      if (files.length > 0) {
                        readImageAsBase64(files[0]).then((base64) => {
                          setProfileDetails((prev) => ({
                            ...prev,
                            profilePic: files,
                            profilePicBase64: base64,
                          }));
                        });
                      } else {
                        setProfileDetails((prev) => ({
                          ...prev,
                          profilePic: [],
                          profilePicBase64: "",
                        }));
                      }
                    }}
                  />
                </div>
              </div>
              <div className="mt-20 flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Label
                      htmlFor="firstname"
                      className="text-foreground/70 absolute font-normal top-0 left-0 w-full p-3"
                    >
                      First name
                    </Label>
                    <Input
                      id="name"
                      className="bg-black border-border pt-7 rounded-lg h-20 text-foreground"
                      value={profileDetails.firstName}
                      onChange={(e) =>
                        setProfileDetails((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="relative flex-1">
                    <Label
                      htmlFor="lastname"
                      className="text-foreground/70 absolute font-normal top-0 left-0 w-full p-3"
                    >
                      Last Name
                    </Label>
                    <Input
                      id="name"
                      className="bg-black border-border pt-7 rounded-lg h-20 text-foreground"
                      value={profileDetails.lastName}
                      onChange={(e) =>
                        setProfileDetails((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="relative">
                  <Label
                    htmlFor="username"
                    className="text-foreground/70 absolute font-normal top-0 left-0 w-full p-3"
                  >
                    Username
                  </Label>
                  <Input
                    id="username"
                    className="bg-black border-border pt-7 rounded-lg h-20 text-foreground"
                    value={profileDetails.username}
                    onChange={(e) =>
                      setProfileDetails((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="relative">
                  <Label
                    htmlFor="bio"
                    className="text-foreground/70 absolute font-normal top-0 left-0 w-full p-3"
                  >
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    className="bg-black border-border pt-7 rounded-lg h-40 text-foreground"
                    value={profileDetails.bio}
                    onChange={(e) =>
                      setProfileDetails((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="relative">
                  <Label
                    htmlFor="location"
                    className="text-foreground/70 absolute font-normal top-2 left-0 w-full p-3"
                  >
                    Location
                  </Label>
                  <div className="">
                    <MyComboBox
                      placeholder="Select Country"
                      searchPlaceholder="Search Countries"
                      selected={profileDetails.location}
                      inputClassName="bg-black border-border h-20 pt-7 text-foreground text-sm"
                      extraAction={(value: string) =>
                        setProfileDetails((prev) => ({
                          ...prev,
                          countryCode: countryData.filter(
                            (country: ICountry) =>
                              country.name.toLowerCase() === value.toLowerCase()
                          )[0]?.phonecode,
                        }))
                      }
                      onChange={(value) =>
                        setProfileDetails((prev) => ({
                          ...prev,
                          location: Array.isArray(value) ? value[0] : value,
                        }))
                      }
                      options={countryData.map((country: ICountry) => ({
                        label: country.name,
                        value: country.name,
                      }))}
                    />
                  </div>
                </div>
                <div className="relative">
                  <Label
                    htmlFor="dob"
                    className="text-foreground/70 absolute font-normal top-2 left-0 w-full p-3 z-10"
                  >
                    Date of birth
                  </Label>
                  <div className="relative">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pt-7 h-20 justify-start text-foreground border-border bg-foreground/20 dark:bg-black mt-2 text-base placeholder:text-foreground/50 text-left",
                            !profileDetails.dob && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {userData?.user.usermeta.dob ? (
                            <span className="text-foreground/80 font-normal text-sm">
                              {format(
                                new Date(userData?.user.usermeta.dob),
                                "PPP"
                              )}
                            </span>
                          ) : (
                            <span></span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className=" w-auto p-0 bg-background"
                      >
                        <Calendar
                          mode="single"
                          captionLayout="dropdown-buttons"
                          selected={
                            profileDetails.dob
                              ? new Date(profileDetails.dob)
                              : undefined
                          }
                          onSelect={(value) => {
                            setProfileDetails((prev) => ({
                              ...prev,
                              dob: value ? format(value, "yyyy-MM-dd") : "",
                            }));
                          }}
                          fromYear={1900}
                          toYear={new Date().getFullYear() - 13}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="bg-border h-[1px]" />
                <div
                  className="relative cursor-pointer"
                  onClick={() => setShowFavoriteSportForm(true)}
                >
                  <Label
                    htmlFor="favoriteSport"
                    className="text-foreground/70 absolute font-normal top-0 left-0 w-full p-3 cursor-pointer"
                    onClick={() => setShowFavoriteSportForm(true)}
                  >
                    Favorite Sport
                  </Label>
                  <Input
                    id="favoriteSport"
                    className="bg-black border-border pt-7 rounded-lg h-20 text-foreground cursor-pointer"
                    value={profileDetails.favoriteSport}
                  />
                </div>
                <div className="relative">
                  <Label
                    htmlFor="favoriteTeam"
                    className="text-foreground/70 absolute font-normal top-2 left-0 w-full p-3"
                  >
                    Favorite Team
                  </Label>
                  <div className="">
                    <MyComboBox
                      mode="single"
                      placeholder="Select team"
                      searchPlaceholder="Search team"
                      selected={profileDetails.favoriteTeam}
                      inputClassName="bg-black border-border text-sm h-20 pt-7 text-foreground"
                      onChange={(value) =>
                        setProfileDetails((prev) => ({
                          ...prev,
                          favoriteTeam: Array.isArray(value) ? value[0] : value,
                        }))
                      }
                      options={
                        teams.data?.data.data
                          ? (
                              ensureUniqueItemsByKey(
                                teams.data?.data.data,
                                "label"
                              ) as unknown as TeamData[]
                            ).map((team: TeamData) => ({
                              label: team.name,
                              value: team.name,
                            }))
                          : []
                      }
                    />
                    {/* {console.log(teams.data)} */}
                  </div>
                </div>
              </div>
            </>
          )}
        </CredenzaDescription>
        <CredenzaFooter className="justify-end sticky bottom-0 pointer-events-none bg-background p-0 py-4 px-2 border-t border-border min-[768px]:flex">
          <Button
            disabled={profileMutation.isPending}
            onClick={handleProfileUpdate}
            className="rounded-full w-full sm:w-48 flex justify-center items-center pointer-events-auto"
          >
            {profileMutation.isPending ? (
              <ImSpinner2 className="size-6 animate-spin text-[#4ED17E]" />
            ) : (
              <span>Save</span>
            )}
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
      {/* </div> */}
    </Credenza>
  );
};

export default EditProfileDialog;
