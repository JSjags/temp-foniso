import { twMerge } from "tailwind-merge";
import Spinner from ".";
import { cn } from "@/lib/utils";

type Props = {
  extraClass?: string;
  spinnerExtraClass?: string;
};
function PageLoadingSpinner(props: Props) {
  return (
    <div
      className={twMerge(
        `p-4 flex items-center justify-center`,
        props.extraClass
      )}
    >
      <Spinner extraClass={cn("h-10 w-10", props.spinnerExtraClass)} />
    </div>
  );
}

export default PageLoadingSpinner;
