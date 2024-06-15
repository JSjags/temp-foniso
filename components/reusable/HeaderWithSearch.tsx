import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const HeaderWithSearch = ({ title }: { title: ReactNode }) => {
  const { back, push } = useRouter();
  return (
    <div className="flex h-[54px] items-center duo:h-14 border-b border-border px-4 mt-2">
      <div className="flex-1 text-center text-xl duo:text-2xl font-bold">
        {title}
      </div>
      <button
        type="button"
        className="size-[30px] duo:size-[45px] center-item rounded-full "
        onClick={() => push(`/message?tab=search`)}
      >
        <Search className="text-foreground text-xl" />
      </button>
    </div>
  );
};

export default HeaderWithSearch;
