import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-dropdown-menu";
import { CalendarIcon, SearchIcon, X } from "lucide-react";
import React, { useState } from "react";
import { format } from "date-fns";
import { MyComboBox } from "@/components/reusable/ComboBox";
import {
  experienceLevel,
  favoriteSports,
  idTypes,
  linkTypes,
  occupation,
} from "@/constants";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OptionProp } from "@/types";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import { Label as InputLabel } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Country } from "country-state-city";
import Image from "next/image";
import FileDropBox from "@/components/ui/FileDropBox";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axiosInstance";
import { professionalVerificationRequest } from "@/services/api/userService";
import toast from "react-hot-toast";
import ErrorToast from "@/components/reusable/toasts/ErrorToast";
import { ImSpinner2 } from "react-icons/im";

type Props = {};

const Professional = (props: Props) => {
  const [countryData, setCountryData] = useState(Country.getAllCountries());
  const router = useRouter();
  const { userData } = useUserContext();

  const [showIdModal, setShowIdModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [date, setDate] = useState<Date>();

  const [errors, setErrors] = useState({
    username: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    sex: "",
    favoriteSport: "",
    occupation: "",
    experienceLevel: "",
    country: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

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

    setErrors(newErrors);

    return isValid;
  };

  const [verificationDetails, setVerificationDetails] = useState({
    careerName: "",
    favoriteSport: "",
    occupation: "",
    experienceLevel: "",
    affiliate: "",
    links: [
      {
        linkType: "",
        url: "",
      },
      {
        linkType: "",
        url: "",
      },
    ],
  });

  const [idDetails, setIdDetails] = useState({
    country: "",
    idType: "",
    idNumber: "",
  });

  const [selectedSelfie, setSelectedSelfie] = useState<File[]>([]);
  const [selectedID, setSelectedID] = useState<File[]>([]);

  const hasEmptyValues = (obj: any): boolean => {
    for (const key in obj) {
      if (typeof obj[key] === "string" && obj[key].trim() === "") {
        return true;
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        if (hasEmptyValues(obj[key])) {
          return true;
        }
      }
    }
    return false;
  };

  const professionalVerification = useMutation({
    mutationKey: ["professional verification"],
    mutationFn: (data: FormData) => professionalVerificationRequest(data),
    onSuccess: () => {
      setShowConfirmationModal(true);
    },
    onError: () => {
      toast.custom((t) => (
        <ErrorToast t={t} message="Couldn't process verification request" />
      ));
    },
  });

  const handleProfessionalVerification = () => {
    const formData = new FormData();

    console.log(verificationDetails);
    console.log(idDetails);

    formData.append("selfie", selectedID[0]);
    formData.append("career_name", verificationDetails.careerName);
    formData.append("sport_category", verificationDetails.favoriteSport);
    formData.append("description", verificationDetails.occupation);
    formData.append("firstname", userData?.user.usermeta.firstname!);
    formData.append("lastname", userData?.user.usermeta.lastname!);
    formData.append("dob", userData?.user.usermeta.dob!);
    formData.append("experience_level", verificationDetails.experienceLevel);
    formData.append("team_affiliate", verificationDetails.affiliate);

    // Append each item in the array individually with the same key
    // verificationDetails.links.forEach((item) => {
    //     formData.append('items[]', JSON.stringify({
    //         provider: link.linkType,
    //         url: link.url,
    //       }));
    //   });

    formData.append(
      "social_link[]",
      JSON.stringify(
        verificationDetails.links.map((link) => ({
          provider: link.linkType,
          url: link.url,
        }))
      )
    );
    formData.append("id_no", idDetails.idNumber);
    formData.append("subtype", "professional");
    formData.append("id_document", selectedID[0]);

    professionalVerification.mutate(formData);
  };

  return (
    <div>
      {/* Show ID verification modal */}
      {showIdModal && (
        <Dialog open={showIdModal} onOpenChange={setShowIdModal} modal>
          {/* <div className="w-full h-full absolute top-0 left-0 z-50"> */}
          <DialogContent className="sm:max-w-[580px] pt-3 px-0 overflow-y-scroll max-h-[90vh] pb-0">
            <AlertDialogHeader>
              <Button
                onClick={() => {
                  setShowIdModal(false);
                }}
                className="size-8 p-1 flex justify-center items-center bg-background/70 rounded-full absolute top-4 left-4"
              >
                <IoArrowBack className="text-foreground size-6" />
              </Button>

              <DialogTitle className="text-center font-bold text-xl mb-3">
                Verify your identity
              </DialogTitle>
              <div className="border-b border-border w-full absolute top-14 left-0"></div>
            </AlertDialogHeader>
            <DialogDescription className="px-2">
              <div className="px-4">
                {/* Country */}
                <div className="mt-4">
                  <InputLabel
                    htmlFor="country"
                    className="text-base mt-8 mb-1 text-foreground/80"
                  >
                    Country/Region of issue
                  </InputLabel>
                  <div>
                    <MyComboBox
                      placeholder="Select Country"
                      searchPlaceholder="Search Countries"
                      selected={idDetails.country}
                      onChange={(value) =>
                        setIdDetails((prev) => ({
                          ...prev,
                          country: Array.isArray(value) ? value[0] : value,
                        }))
                      }
                      options={countryData.map((country) => ({
                        label: country.name,
                        value: country.name,
                      }))}
                      inputClassName="dark:bg-black bg-foreground/20 border-border text-foreground/70"
                    />
                  </div>
                  <div className="mt-4">
                    <FileDropBox
                      onFilesSelected={setSelectedSelfie}
                      maxSizeInMB={5}
                    />
                  </div>
                  {/* {errors.country && (
                      <p className="text-sm mt-1 text-red-500">
                        {errors.country}
                      </p>
                    )} */}
                </div>
                {/* Document type */}
                <div className="mt-6">
                  <InputLabel
                    htmlFor="country"
                    className="text-base mt-8 mb-1 text-foreground/80"
                  >
                    Document type
                  </InputLabel>
                  <div className="mt-4">
                    <RadioGroup
                      defaultValue="ID Card"
                      value={idDetails.idType}
                      onValueChange={(value) =>
                        setIdDetails((prev) => ({
                          ...prev,
                          idType: value,
                        }))
                      }
                    >
                      {idTypes.map((idType, id) => (
                        <div
                          key={id}
                          className="px-4 flex items-center space-x-2 py-2 pb-4 justify-between border rounded-lg border-border dark:bg-black bg-foreground/20"
                        >
                          <InputLabel
                            htmlFor={idType.value}
                            className="text-foreground/70 text-base"
                          >
                            {idType.label}
                          </InputLabel>

                          <RadioGroupItem
                            value={idType.value}
                            id={idType.value}
                            className="text-brand-primary border-border"
                          />
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  {idDetails.idType && (
                    <>
                      <div className="flex-1 mt-6">
                        <Label className="text-base mt-8 mb-1 text-foreground/80">
                          {idDetails.idType} Number
                        </Label>
                        <Input
                          value={idDetails.idNumber}
                          onChange={(e) =>
                            setIdDetails((prev) => ({
                              ...prev,
                              idNumber: e.target.value,
                            }))
                          }
                          className="border-border text-foreground/80 dark:bg-black bg-foreground/20 mt-2 h-[54px] placeholder:text-foreground/30"
                          placeholder="Enter your document number"
                        />
                      </div>
                      <div className="flex-1 mt-4">
                        <Label className="text-base mb-2 text-foreground/80">
                          Upload your {idDetails.idType}
                        </Label>
                        <FileDropBox
                          onFilesSelected={setSelectedID}
                          maxSizeInMB={5}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="px-4">
                <p className="text-base mt-8 mb-1 text-foreground/80 font-bold">
                  Requirement ID
                </p>
                <div>
                  <ul className="list-disc pl-5 flex flex-col gap-y-3">
                    <li className="text-foreground/50">
                      Must be a valid government-issued identification document
                    </li>
                    <li className="text-foreground/50">
                      Copies of the original documents is needed. Scanned copies
                      or selfies are not acceptable
                    </li>
                    <li className="text-foreground/50">
                      Make sure the ID card is well-lit and all information is
                      clearly visible
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <p className="text-base mb-1 text-foreground/80 font-bold">
                    Selfie
                  </p>
                  <ul className="list-disc pl-5 flex flex-col gap-y-3">
                    <li className="text-foreground/50">
                      Ensure proper lighting and cluster free background
                    </li>
                    <li className="text-foreground/50">
                      Keep your face prominently in the shot
                    </li>
                  </ul>
                </div>
              </div>
            </DialogDescription>
            <DialogFooter className="flex justify-end sticky bottom-0 bg-background p-0 py-4 px-6 border-t border-border translate-y-[1px]">
              <Button
                disabled={
                  hasEmptyValues(idDetails) ||
                  selectedSelfie.length < 1 ||
                  selectedID.length < 1 ||
                  professionalVerification.isPending
                }
                onClick={() => handleProfessionalVerification()}
                className="rounded-full w-full flex justify-center items-end"
              >
                {professionalVerification.isPending ? (
                  <ImSpinner2 className="size-6 animate-spin text-[#4ED17E]" />
                ) : (
                  <span>Confirm</span>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
          {/* </div> */}
        </Dialog>
      )}
      {/* Show submission confirmation modal */}
      {showConfirmationModal && (
        <Dialog
          open={showConfirmationModal}
          onOpenChange={() => router.replace("/home")}
          modal
        >
          {/* <div className="w-full h-full absolute top-0 left-0 z-50"> */}
          <DialogContent className="sm:max-w-[580px] pt-3 px-0 overflow-y-scroll max-h-[90vh] pb-0">
            <DialogDescription className="px-2 max-w-[487px] w-full mx-auto">
              <div className="flex justify-center">
                <Image
                  src={"/assets/graphics/done.svg"}
                  alt="Done"
                  width={120}
                  height={120}
                />
              </div>
              <p className="font-bold text-2xl text-foreground text-center">
                Verification request submitted
              </p>
              <div className="w-full max-w-[315px] mx-auto mt-2">
                <p className="text-foreground/50 text-center text-normal pb-40">
                  We are reviewing your submission. We will notify you when we
                  are done.
                </p>
              </div>
              <div className="px-4">
                <Button
                  onClick={() => {
                    () => router.replace("/home");
                  }}
                  className="bg-white w-full rounded-full"
                >
                  Back to home
                </Button>
              </div>
            </DialogDescription>
            <DialogFooter className="sticky bottom-0 bg-background p-0 py-4 pt-0 px-6 translate-y-[1px]">
              <div className="w-full mx-auto max-w-[487px]">
                <p className="text-foreground/50 text-center text-sm">
                  If you have any questions or concerns, feel free to contact
                </p>
                <p className="text-colorPrimary text-center text-sm">
                  support@foniso.team
                </p>
              </div>
            </DialogFooter>
          </DialogContent>
          {/* </div> */}
        </Dialog>
      )}

      <div className="flex gap-x-4 items-center p-4 border-b border-border sticky top-0 bg-background z-10">
        <Button
          onClick={() => router.back()}
          className="size-8 p-1 flex justify-center items-center bg-black/50 rounded-full hover:bg-black/80"
        >
          <IoArrowBack className="text-foreground size-6" />
        </Button>
        <div className="flex-1">
          <div className="flex flex-1 gap-x-2 items-center">
            <p className="text-foreground flex-1 cursor-pointer font-bold line-clamp-1 text-ellipsis text-xl text-center">
              Professional verification
            </p>
          </div>
        </div>
        <Button
          onClick={() => setShowIdModal(true)}
          className="hidden bg-transparent hover:bg-transparent text-foreground p-1 justify-center items-center rounded-full font-bold text-colorPrimary text-lg"
        >
          Next
        </Button>
      </div>
      <div className="px-4 mt-6">
        <p className="text-sm text-foreground/70 text-center">
          You are required to provide these information for verification
          purpose.
        </p>

        {/* Step 1 */}
        <div className="pb-8 border-b border-border">
          <p className="text-2xl text-foreground/80 font-bold mt-10">
            Step 1: Personal information
          </p>

          <div className="mt-4 flex flex-col sm:flex-row gap-5">
            <div className="flex-1">
              <Label className="mb-1 text-foreground/80">First name</Label>
              <Input
                className="border-border dark:bg-black bg-foreground/20 h-[54px] text-foreground/80 font-normal"
                value={userData?.user.usermeta.firstname}
                readOnly
              />
            </div>
            <div className="flex-1">
              <Label className="mb-1 text-foreground/80">Last name</Label>
              <Input
                className="border-border dark:bg-black bg-foreground/20 h-[54px] text-foreground/80 font-normal"
                value={userData?.user.usermeta.lastname}
                readOnly
              />
            </div>
          </div>
          <div className="mt-4 flex gap-5">
            <div className="flex-1">
              <Label className="mb-1 text-foreground/80">Date of birth</Label>
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-foreground border-border bg-foreground/20 dark:bg-black mt-2 h-[54px] text-base placeholder:text-foreground/50 text-left",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {userData?.user.usermeta.dob ? (
                        <span className="text-foreground/80 font-normal text-sm">
                          {format(new Date(userData?.user.usermeta.dob), "PPP")}
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
                      selected={date}
                      onSelect={(value) => {
                        setDate(value);
                        if (
                          Object.values(errors).some((error) => error !== "")
                        ) {
                          validateForm();
                        }
                      }}
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="pb-8 border-b border-border">
          <p className="text-2xl text-foreground/80 font-bold mt-8">
            Step 2: Career Information
          </p>
          <div className="flex-1 mt-4">
            <Label className="mb-1 text-foreground/80">Your career name</Label>
            <Input
              className="border-border dark:bg-black bg-foreground/20 h-[54px] text-foreground/80"
              value={verificationDetails.careerName}
              onChange={(e) =>
                setVerificationDetails((prev) => ({
                  ...prev,
                  careerName: e.target.value,
                }))
              }
            />
          </div>
          {/* Favorite sport */}
          <div className="flex-1 mt-4">
            <Label className="mb-1 text-foreground/80">
              Your sport category
            </Label>
            <MyComboBox
              placeholder="Select favorite sport"
              searchPlaceholder="Search sports"
              selected={verificationDetails.favoriteSport}
              inputClassName="dark:bg-black bg-foreground/20 border-border"
              extraAction={(value: string) => {
                if (Object.values(errors).some((error) => error !== "")) {
                  validateForm();
                }
                setVerificationDetails((prev) => {
                  return { ...prev, favoriteSport: value };
                });
              }}
              onChange={(value: any) => {
                setVerificationDetails((prev) => ({
                  ...prev,
                  favoriteSport: Array.isArray(value) ? value[0] : value,
                }));
              }}
              options={favoriteSports}
            />
          </div>
          {/* Occupation */}
          <div className="flex-1 mt-4">
            <Label className="mb-1 text-foreground/80">
              What accurately describes you?
            </Label>
            <MyComboBox
              placeholder="Select"
              searchPlaceholder="Search suggestions"
              selected={verificationDetails.occupation}
              inputClassName="dark:bg-black bg-foreground/20 border-border"
              //   extraAction={(value: string) => {
              //     if (Object.values(errors).some((error) => error !== "")) {
              //       validateForm();
              //     }
              //     setVerificationDetails((prev) => {
              //       return { ...prev, occupation: value };
              //     });
              //   }}
              onChange={(value: any) => {
                setVerificationDetails((prev) => ({
                  ...prev,
                  occupation: Array.isArray(value) ? value[0] : value,
                }));
              }}
              options={occupation}
            />
          </div>
          {/* Experience level */}
          <div className="flex-1 mt-4">
            <Label className="mb-1 text-foreground/80">Experience level</Label>
            <Select
              onValueChange={(value) => {
                setVerificationDetails((prev) => ({
                  ...prev,
                  experienceLevel: value,
                }));
                if (Object.values(errors).some((error) => error !== "")) {
                  validateForm();
                }
              }}
            >
              <SelectTrigger
                id="experience level"
                value={verificationDetails.experienceLevel}
                className="w-full mt-2 text-foreground  dark:bg-black bg-foreground/20 border-border h-[54px] font-semibold"
              >
                <SelectValue
                  placeholder="Select"
                  className="text-foreground text-base text-semibold placeholder:text-foreground/50 font-semibold"
                  color="white"
                />
              </SelectTrigger>
              <SelectContent className="bg-background border-border mt-4">
                {experienceLevel.map((level: OptionProp, i: number) => (
                  <SelectItem
                    key={level.label}
                    className="py-2 text-base text-foreground font-semibold data-[highlighted]:text-foreground"
                    value={level.value}
                  >
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DropdownMenu />
          </div>
          {/* Affiliate */}
          <div className="flex-1 mt-4">
            <Label className="mb-1 text-foreground/80">
              Your team or affiliate
            </Label>
            <Input
              className="border-border dark:bg-black bg-foreground/20 h-[54px]"
              value={verificationDetails.affiliate}
              onChange={(e) =>
                setVerificationDetails((prev) => ({
                  ...prev,
                  affiliate: e.target.value,
                }))
              }
            />
          </div>
        </div>

        {/* Step 3 */}
        <div className="pb-8 mb-60">
          <p className="text-2xl text-foreground/80 font-bold mt-8">
            Step 3: Confirm authenticity
          </p>
          <div className="mt-4">
            <p className="text-lg font-medium text-foreground/80">
              Add links 2-5
            </p>
            <p className="text-foreground/60">
              Add Links to social media accounts, articles, website and other
              links that validates your professional identity
            </p>
          </div>
          {/* links */}
          <div className="flex flex-col gap-y-2">
            {verificationDetails.links.map((_, i) => (
              <div key={i} className="flex flex-col mt-4">
                <div className="flex-1">
                  <Select
                    value={verificationDetails.links[i].linkType}
                    onValueChange={(value) => {
                      let newLinks = [...verificationDetails.links];
                      newLinks[i].linkType = value;
                      setVerificationDetails((prev) => {
                        return {
                          ...prev,
                          links: newLinks,
                        };
                      });
                    }}
                  >
                    <SelectTrigger
                      id="link_type"
                      className="w-full mt-2 text-foreground  dark:bg-black bg-foreground/20 border-border h-[54px] font-semibold"
                    >
                      <SelectValue
                        placeholder="Select link type"
                        className="text-foreground text-base text-semibold placeholder:text-foreground/50 font-semibold"
                        color="white"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border mt-4">
                      {linkTypes.map((linkType: OptionProp, i: number) => (
                        <SelectItem
                          key={linkType.label}
                          className="py-2 text-base text-foreground font-semibold data-[highlighted]:text-foreground"
                          value={linkType.value}
                        >
                          {linkType.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-2 relative">
                  <Input
                    className="border-border dark:bg-black bg-foreground/20 h-[54px] placeholder:text-foreground/50"
                    placeholder="URL"
                    onChange={(e) => {
                      setVerificationDetails((prev) => {
                        let newLinks = [...prev.links];
                        newLinks[i].url = e.target.value;
                        return {
                          ...prev,
                          links: newLinks,
                        };
                      });
                    }}
                  />
                  {verificationDetails.links.length > 2 &&
                    verificationDetails.links.length < 6 && (
                      <Button
                        onClick={() => {
                          let newListCopy = [...verificationDetails.links];
                          newListCopy.splice(i, 1);
                          setVerificationDetails((prev) => ({
                            ...prev,
                            links: newListCopy,
                          }));
                        }}
                        className={cn(
                          "size-5 p-0 bg-foreground/10 hover:bg-red-500 rounded-full text-foreground flex justify-center items-center absolute right-2 top-1/2 -translate-y-1/2"
                        )}
                      >
                        <X size={10} />
                      </Button>
                    )}
                </div>
              </div>
            ))}
            <Button
              disabled={verificationDetails.links.length >= 5}
              onClick={() => {
                setVerificationDetails((prev) => ({
                  ...prev,
                  links: [...prev.links, { linkType: "", url: "" }],
                }));
              }}
              className="mt-10 font-semibold text-white dark:bg-foreground/10 dark:hover:bg-foreground/30 bg-foreground/50"
            >
              Add link
            </Button>
            <Button
              disabled={hasEmptyValues(verificationDetails)}
              onClick={() => setShowIdModal(true)}
              className="rounded-full w-full mt-10"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Professional;
