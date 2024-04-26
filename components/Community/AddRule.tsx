import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { AddRulesContext } from "@/types/community";
import { useSearchParams } from "next/navigation";
import { communityRules } from "@/constants";
import { useEffect } from "react";

type Props = {
  onSubmit: (val: AddRulesContext) => void;
};

const AddRule = (props: Props) => {
  const searchParams = useSearchParams();

  const { register, handleSubmit, getValues, setValue } =
    useForm<AddRulesContext>({
      defaultValues: {
        title: "",
        description: "",
      },
    });

  const onSubmit: SubmitHandler<AddRulesContext> = (data) => {
    props.onSubmit(data);
  };

  useEffect(() => {
    if (searchParams.get("edit")) {
      const rule = communityRules[Number(searchParams.get("edit"))];

      setValue("title", rule.title);
      setValue("description", rule.desc);
    }
  }, [searchParams, setValue]);

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title" className="text-[#888888]">
          Rule title
        </label>
        <div className="w-full h-fit relative center-item">
          <Input
            id="title"
            type="text"
            autoComplete="off"
            maxLength={40}
            className="!ring-0 !outline-none !border-0 !border-b !border-gray-400 !rounded-none"
            {...register("title", { required: true, maxLength: 40 })}
          />

          <span className="absolute right-2">
            {getValues("title").length}/40
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

      <Button className="w-full rounded-full mt-[131px] bg-[#676666] h-14 mb-6">
        {searchParams.get("edit") ? "Edit rule" : "Create rule"}
      </Button>
    </form>
  );
};

export default AddRule;
