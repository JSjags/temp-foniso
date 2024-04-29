import { Dialog, DialogContent } from "@/components/ui/dialog";
import useIsMobile from "@/hooks/useIsMobile";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MobileDrawer from "../ui/MobileDrawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { RxCaretDown } from "react-icons/rx";
import { RxLockClosed } from "react-icons/rx";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";

const CreateBuzzContent = ({ close }: { close: () => void }) => {
  const { handleSubmit, register, setValue, watch } = useForm<{
    title: string;
    buzz_type: string;
  }>({
    defaultValues: {
      title: "",
      buzz_type: "Private",
    },
  });

  const values = watch();

  const onSubmit = () => {
    console.log("submitted");
    close();
  };
  return (
    <div className="">
      <p className="text-xl md:text-2xl font-bold mt-5 md:mt-7">Create Buzz</p>

      <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-[#1A1A1A] dark:text-[#7C7C7C] mb-3">Privacy</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center justify-between px-4 md:px-5 bg-[#D9D9D9] dark:bg-[#222623] rounded-full w-[9.1rem] h-[2.81rem]"
            >
              <div className="flex items-center gap-1">
                <RxLockClosed className="text-xl text-white" />
                <span className="text-sm">{values.buzz_type}</span>
              </div>
              <RxCaretDown />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[359px]" align="start">
            {["Private", "Public"].map((item) => (
              <DropdownMenuItem
                key={item}
                className="cursor-pointer"
                onClick={() => setValue("buzz_type", item)}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Input
          className="!border-none !rounded-none !outline-none !ring-0 !placeholder-[#616161] mt-5"
          placeholder="What is the topic for discussion?"
          {...register("title", { required: true, maxLength: 40 })}
        />

        <Button className="h-14 bg-[#888888] dark:bg-[#F2FFF7] rounded-full w-full mt-30px mb-6">
          Start Buzz
        </Button>
      </form>
    </div>
  );
};

const CreateBuzz = () => {
  const is_mobile = useIsMobile();
  const searchParam = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleClose = () => {
    replace(pathname);
  };

  return (
    <div>
      <Dialog
        open={searchParam.get("tab") === "create-buzz" && !is_mobile}
        onOpenChange={handleClose}
      >
        <DialogContent
          className="md:!max-w-[680px] px-5"
          closeBtnClass="size-[35px] rounded-full bg-[#7C7C7C] center-item"
        >
          <CreateBuzzContent close={handleClose} />
        </DialogContent>
      </Dialog>

      <MobileDrawer
        open={searchParam.get("tab") === "create-buzz" && is_mobile}
        close={handleClose}
      >
        <CreateBuzzContent close={handleClose} />
      </MobileDrawer>
    </div>
  );
};

export default CreateBuzz;
