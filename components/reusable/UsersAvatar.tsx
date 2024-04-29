import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  items: Array<string>;
  wrapperClass?: string;
  avatarClass?: string;
  alignLeft?: number;
  totalCount?: string;
};

const UsersAvatar = (props: Props) => {
  return (
    <div className={cn("flex items-center", props.wrapperClass)}>
      {props.items.map((item, idx) => (
        <div
          key={item}
          className={cn(
            "size-5 overflow-hidden relative rounded-full bg-white",
            props.avatarClass
          )}
          style={{
            left: `-${idx * (props.alignLeft ?? 8)}px`,
            border: item ? "1.2px solid #0C0F0E" : undefined,
          }}
        >
          <Image
            src={`https://source.unsplash.com/random/350x230/?listener+${item}`}
            alt="participant"
            fill
          />
        </div>
      ))}

      {Boolean(props.totalCount) && (
        <span
          className="text-white text-xs relative font-semibold leading-none ml-1"
          style={{ left: `-${2 * (props.alignLeft ?? 8)}px` }}
        >
          {props.totalCount}
        </span>
      )}
    </div>
  );
};

export default UsersAvatar;
