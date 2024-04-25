import { RotateSpinner } from "react-spinners-kit";

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="mt-0 flex justify-center items-center w-[200px] min-h-[160px]">
      <RotateSpinner size={30} color="#188C43" loading={isLoading} />
    </div>
  );
};

export default Loading;
