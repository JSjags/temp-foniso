import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { AddRulesContext } from "@/types/community";
import { useParams, useSearchParams } from "next/navigation";
import { communityRules } from "@/constants";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOneCommunity } from "@/services/api/community";
import { ImSpinner2 } from "react-icons/im";

type Props = {
  onSubmit: (val: AddRulesContext) => void;
  isPending?: boolean;
};

const AddRule = (props: Props) => {
  const searchParams = useSearchParams();
  const { community_id } = useParams();

  const { register, handleSubmit, watch, setValue } = useForm<AddRulesContext>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { data: community_info } = useQuery({
    queryKey: ["one-community", community_id],
    queryFn: () => getOneCommunity(String(community_id)),
  });

  const values = watch();

  const onSubmit: SubmitHandler<AddRulesContext> = (data) => {
    props.onSubmit(data);
  };

  useEffect(() => {
    if (community_info?.data.data && searchParams.get("edit")) {
      const rule = community_info?.data.data?.rules.find(
        (item) => item.id === Number(searchParams.get("edit"))
      );

      if (rule) {
        setValue("title", rule.title);
        setValue("description", rule.description);
      }
    }
  }, [searchParams, setValue, community_info?.data.data]);

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

          <span className="absolute right-2">{values["title"].length}/40</span>
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
            {values["description"].length}/80
          </span>
        </div>
      </div>
      <Button className="w-full rounded-full mt-[131px] bg-[#676666] h-14 mb-6">
        {props.isPending ? (
          <ImSpinner2 className="size-7 ml-3 animate-spin text-[#4ED17E]" />
        ) : searchParams.get("edit") ? (
          "Edit rule"
        ) : (
          "Create rule"
        )}
      </Button>
    </form>
  );
};

export default AddRule;
