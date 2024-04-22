import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { CiGlobe } from "react-icons/ci";
import { VscLock } from "react-icons/vsc";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateCommunityForm } from "@/types/community";

const radio_options = [
  {
    icon: <CiGlobe className="size-5" strokeWidth={0.5} />,
    value: "public",
    desc: "Anyone can view,post and comment on this community",
  },
  {
    icon: <VscLock className="size-5" strokeWidth={0.5} />,
    value: "restricted",
    desc: "Anyone can view this community but only approved users can post",
  },
];

type Props = {
  onSubmit: (val: CreateCommunityForm) => void;
};

const CreateCommunity = (props: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    // formState: { errors },
  } = useForm<CreateCommunityForm>({
    defaultValues: {
      community_name: "",
      description: "",
      community_type: "public",
    },
  });

  const onSubmit: SubmitHandler<CreateCommunityForm> = (data) => {
    props.onSubmit(data);
  };
  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="community_name" className="text-[#888888]">
          Community name
        </label>
        <div className="w-full h-fit relative center-item">
          <Input
            id="community_name"
            type="text"
            autoComplete="off"
            maxLength={21}
            className="!ring-0 !outline-none !border-0 !border-b !border-gray-400 !rounded-none"
            {...register("community_name", { required: true, maxLength: 21 })}
          />

          <span className="absolute right-2">
            {getValues("community_name").length}/21
          </span>
        </div>
      </div>

      <div className="mt-10">
        <label htmlFor="community_description" className="text-[#888888]">
          Description(optional)
        </label>
        <div className="w-full h-fit relative center-item">
          <Input
            id="community_description"
            type="text"
            autoComplete="off"
            maxLength={80}
            className="!ring-0 !outline-none !border-0 !border-b !border-gray-400 !rounded-none"
            {...register("description", { maxLength: 80 })}
          />

          <span className="absolute right-2">
            {getValues("description").length}/80
          </span>
        </div>
      </div>

      <p className="text-lg font-bold my-6">Community type</p>
      <RadioGroup
        defaultValue="public"
        className="space-y-30px"
        onValueChange={(val) => {
          setValue("community_type", val);
        }}
      >
        {radio_options.map(({ icon, value, desc }) => (
          <div className="flex gap-3" key={value}>
            <RadioGroupItem
              value={value}
              id={value}
              className="text-white border border-gray-50 size-6"
            />
            <Label htmlFor={value} className="text-foreground text-base block">
              <span className="flex items-center gap-1">
                {icon}
                <span className="text-lg font-bold capitalize">{value}</span>
              </span>
              <span className="mt-3 leading-none text-[#888888] dark:text-[#7C7C7C]">
                {desc}
              </span>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <Button className="w-full rounded-full mt-14 bg-[#676666] h-14 mb-6">
        Create community
      </Button>
    </form>
  );
};

export default CreateCommunity;
