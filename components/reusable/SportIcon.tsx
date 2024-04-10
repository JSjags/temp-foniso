import Image from "next/image";

type Props = { category: string };

const SportIcon = ({ category }: Props) => {
  switch (category.toLowerCase()) {
    case "football":
      return (
        <Image
          width={14}
          height={14}
          alt="category"
          src={"/assets/sports-icons/football.svg"}
          className="w-[14px] h-[14px]"
        />
      );

    default:
      break;
  }
};

export default SportIcon;
