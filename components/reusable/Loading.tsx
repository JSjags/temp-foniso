import { cn } from "@/lib/utils";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";

const Loading = ({
  isLoading,
  className,
  extraClass,
  spinnerClass,
}: {
  isLoading: boolean;
  className?: string;
  extraClass?: string;
  spinnerClass?: string;
}) => {
  return (
    <div
      className={cn(
        "mt-0 flex justify-center items-center w-[200px] min-h-[160px]",
        className
      )}
    >
      <PageLoadingSpinner
        spinnerExtraClass={cn("size-4 sm:size-7", spinnerClass)}
        extraClass={extraClass}
      />
    </div>
  );
};

export default Loading;
