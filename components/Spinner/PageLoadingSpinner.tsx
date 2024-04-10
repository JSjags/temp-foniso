import { twMerge } from "tailwind-merge";
import Spinner from ".";

type Props = {
  extraClass?: string;
};
function PageLoadingSpinner(props: Props) {
  return (
    <div className={twMerge(`p-4 flex items-center justify-center`, props.extraClass)}>
      <Spinner extraClass="h-10 w-10" />
    </div>
  );
}

export default PageLoadingSpinner;
