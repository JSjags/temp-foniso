import { ImSpinner2 } from "react-icons/im";

const Loading = () => {
  return (
    <div className="w-full h-dvh bg-background center-item">
      <ImSpinner2 className="size-10 animate-spin text-[#4ED17E]" />
    </div>
  );
};

export default Loading;
