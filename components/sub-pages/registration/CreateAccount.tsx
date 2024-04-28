import { MyComboBox } from "@/components/reusable/ComboBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateSignupForm } from "@/lib/signupValidation";
import { validatePhoneNumber } from "@/lib/utils";
import { useState } from "react";
import validator from "validator";
import { Country } from "country-state-city";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import PageLoadingSpinner from "@/components/Spinner/PageLoadingSpinner";

type Props = {
  submitFormData: UseMutationResult<AxiosResponse<any, any>, any, any, unknown>;
};

const CreateAccount = ({ submitFormData }: Props) => {
  const [countryData, setCountryData] = useState(Country.getAllCountries());
  const [formData, setFormData] = useState({
    country: "",
    email: "",
    phone: "",
    phoneCode: "",
  });

  const [errors, setErrors] = useState({
    country: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate form fields as the user types
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case "country":
        if (!value) {
          newErrors.country = "Country is required";
        } else {
          newErrors.country = "";
        }
        break;
      case "email":
        if (!value) {
          newErrors.email = "Email is required";
        } else {
          newErrors.email = "";
        }
        if (!validator.isEmail(value)) {
          newErrors.email = "Email is invalid";
        } else {
          newErrors.email = "";
        }
        break;
      case "phone":
        if (!value) {
          newErrors.phone = "Phone number is required";
        } else {
          newErrors.phone = "";
        }
        if (!validatePhoneNumber(value)) {
          newErrors.phone = "Phone number is invalid";
        } else {
          newErrors.phone = "";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };
  // onClick={() => verifyEmail()}

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate form fields
    const newErrors = {
      country: "",
      email: "",
      phone: "",
    };

    // Basic validation for country
    if (!formData.country) {
      newErrors.country = "Country is required";
    }
    // Basic validation for email
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!validator.isEmail(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Basic validation for phone number
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }
    if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }

    // Update errors state
    setErrors(newErrors);

    // If there are no errors, submit the form
    if (Object.values(newErrors).every((error) => !error)) {
      // Submit form data
      handleFormSubmission();
    }
  };

  const handleFormSubmission = () => {
    const response = submitFormData.mutate({
      country: formData.country,
      country_code: formData.phoneCode,
      mobile: formData.phone,
      email: formData.email,
    });
  };

  // useEffect(() => {
  //   if (!formData.country) {
  //     setErrors((prev) => ({ ...prev, country: "Country is required" }));
  //   } else {
  //     setErrors((prev) => ({ ...prev, country: "" }));
  //   }
  // }, [formData.country]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[571px] p-6 pb-8 pt-4 border border-border bg-background rounded-xl mt-6 mb-20"
    >
      <h2 className="text-xl sm:text-[24px] text-center font-bold text-foreground mb-4">
        Create account
      </h2>
      <div>
        <Label
          htmlFor="country"
          className="text-foreground text-base font-semibold mt-8"
        >
          Your country
        </Label>
        <div>
          <MyComboBox
            placeholder="Select Country"
            searchPlaceholder="Search Countries"
            selected={formData.country}
            extraAction={(value: string) =>
              setFormData((prev) => ({
                ...prev,
                phoneCode: countryData.filter(
                  (country) =>
                    country.name.toLowerCase() === value.toLowerCase()
                )[0]?.phonecode,
              }))
            }
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                country: Array.isArray(value) ? value[0] : value,
              }))
            }
            options={countryData.map((country) => ({
              label: country.name + ` (${country.phonecode})`,
              value: country.name,
            }))}
          />
        </div>
        {errors.country && (
          <p className="text-sm mt-1 text-red-500">{errors.country}</p>
        )}
      </div>
      <div className="mt-4">
        <Label
          htmlFor="email"
          className="text-colorWhite text-base font-semibold"
        >
          Your Phone number
        </Label>
        <Input
          type="number"
          id="phone"
          onChange={handleChange}
          placeholder="Enter Phone number"
          name="phone"
          className="bg-transparent mt-2 border-foreground/50 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold"
        />
        {errors.phone && (
          <p className="text-sm mt-1 text-red-500">{errors.phone}</p>
        )}
      </div>
      <div className="mt-4">
        <Label
          htmlFor="email"
          className="text-colorWhite text-base font-semibold"
        >
          Your Email address
        </Label>
        <Input
          id="email"
          name="email"
          onChange={handleChange}
          placeholder="Enter your email address"
          className="bg-transparent mt-2 border-foreground/50 h-[54px] text-base text-semibold placeholder:text-foreground/50 font-semibold"
        />
        {errors.email && (
          <p className="text-sm mt-1 text-red-500">{errors.email}</p>
        )}
      </div>

      <Button
        disabled={!validateSignupForm(formData).isValid}
        className="w-full hover:bg-foreground hover:text-background hover:scale-[1.01] transition-all hover:shadow-xl bg-foreground border border-border text-foreground rounded-full flex justify-center items-center mt-10 h-[54px]"
      >
        {submitFormData.isPending ? (
          <PageLoadingSpinner spinnerExtraClass="w-7 h-7" />
        ) : (
          <span className="text-base font-bold block p-0 align-middle -translate-y-[2px] text-background">
            Create account
          </span>
        )}
      </Button>
      <div className="flex items-center justify-center gap-x-1 text-foreground/50 mt-4 text-base">
        <span className="whitespace-nowrap">Already have an account?</span>
        <Button
          variant={"ghost"}
          className="w-fit h-fit transition-all flex justify-center items-center p-0"
        >
          <span className="text-base text-foreground font-bold block p-0 align-middle">
            Log in
          </span>
        </Button>
      </div>
    </form>
  );
};

export default CreateAccount;
