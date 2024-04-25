import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = { category: string; size?: number };

const SportIcon = ({ category, size }: Props) => {
  switch (category?.toLowerCase()) {
    case "american football":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/american-football.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "athletics medal":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/athletics medal.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "badminton":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/badminton.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "baseball":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/baseball.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "basketball":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/basketball.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "bowling":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/bowling.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "boxing":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/boxing.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "cricket":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/cricket.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "cycling":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/cycling.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "field-hockey":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/field-hockey.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "football":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/football.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "golf":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/golf.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "handball":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/Handball.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "ice hockey":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/ice hockey.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "lacrosse":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/Lacrosse.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "mma":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/mma.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "racing":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/racing.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "rugby":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/rugby.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "run":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/run.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "skiing":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/skiing.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "skipping":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/skipping.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "surfing":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/surfing.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "swimming":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/swimming.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "tennis":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/tennis.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
    case "volleyball":
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/volleyball.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );

    default:
      return (
        <Image
          width={size ?? 14}
          height={size ?? 14}
          alt="category"
          src={"/assets/sports-icons/football.svg"}
          className={cn(
            "w-[14px] h-[14px]",
            size && `w-[${size}px] h-[${size}px]`
          )}
        />
      );
      break;
  }
};

export default SportIcon;
