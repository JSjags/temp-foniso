import { cn } from "@/lib/utils";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";

const Loading = ({
  isLoading,
  className,
  extraClass,
}: {
  isLoading: boolean;
  className?: string;
  extraClass?: string;
}) => {
  return (
    <div
      className={cn(
        "mt-0 flex justify-center items-center w-[200px] min-h-[160px]",
        className
      )}
    >
      <PageLoadingSpinner spinnerExtraClass="w-7 h-7" extraClass={extraClass} />
    </div>
  );
};

export default Loading;
