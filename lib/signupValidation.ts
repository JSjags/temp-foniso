// signupValidation.ts

interface FormData {
  country: string;
  email: string;
  phone: string;
  phoneCode: string;
}

interface Errors {
  country: string;
  email: string;
  phone: string;
}

export const validateSignupForm = (
  formData: FormData
): { isValid: boolean; errors: Errors } => {
  const errors: Errors = {
    country: "",
    email: "",
    phone: "",
  };

  // Basic validation for email
  if (!formData.email) {
    errors.email = "Email is required";
  }

  // Basic validation for phone number
  if (!formData.phone) {
    errors.phone = "Phone number is required";
  }

  return {
    isValid: Object.values(errors).every((error) => !error),
    errors,
  };
};
