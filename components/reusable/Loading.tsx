import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="mt-0 flex justify-center items-center w-[200px] min-h-[160px]">
      <PageLoadingSpinner spinnerExtraClass="w-7 h-7" />
    </div>
  );
};

export default Loading;
