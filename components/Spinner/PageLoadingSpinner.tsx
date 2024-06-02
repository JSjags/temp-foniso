import { twMerge } from "tailwind-merge";
import Spinner from ".";
import { cn } from "@/lib/utils";
import { ImSpinner2 } from "react-icons/im";

type Props = {
  extraClass?: string;
  spinnerExtraClass?: string;
};
function PageLoadingSpinner(props: Props) {
  return (
    <div className="mt-0 flex justify-center">
      {/* <PageLoadingSpinner /> */}
      <ImSpinner2
        className={cn(
          "size-4 sm:size-8 animate-spin text-[#4ED17E]",
          props.spinnerExtraClass,
          props.extraClass
        )}
      />
    </div>
  );
}

export default PageLoadingSpinner;
