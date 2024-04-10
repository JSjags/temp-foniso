import { toast } from "react-toastify";
import colors from "styles/colors";

const doToast = (message, type) => {
  let bgColor;
  if (type === "success") {
    bgColor = colors.green;
  } else if (type === "error") {
    bgColor = "#FF4746";
  } else if (type === "warn") {
    bgColor = "#e2a91b";
  }
  const options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: { backgroundColor: bgColor, fontSize: 14 }
  };
  if (type === "error") {
    toast.error(message ?? "", options);
  } else if (type === "info") {
    toast.info(message ?? "", options);
  } else {
    toast.success(message ?? "", options);
  }
};

export default doToast;
