import { toast } from "react-toastify";

export const toastify = (
  msg: string,
  type: "success" | "error" | "info" | "warn"
) => {
  let bgColor;
  if (type === "success") {
    bgColor = "#0C9667";
  } else if (type === "error") {
    bgColor = "#FF4746";
  } else if (type === "warn") {
    bgColor = "#e2a91b";
  }

  return toast[type](msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: { color: "#ffffff", backgroundColor: bgColor },
  });
};

export const showToast = {
  success: (msg: string) => toastify(msg, "success"),
  info: (msg: string) => toastify(msg, "info"),
  warn: (msg: string) => toastify(msg, "warn"),
  error: (msg?: string) =>
    toastify(msg || "Unexpected error occured! try again later", "error"),
};
