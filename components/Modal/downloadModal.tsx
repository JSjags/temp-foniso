import { Dispatch, SetStateAction } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

type PropType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function DownloadModal(props: PropType) {
  const cld = new Cloudinary({ cloud: { cloudName: "delflsgq4" } });
  return (
    <Dialog
      open={props.isOpen}
      onClose={() => props.setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
          <Dialog.Panel className="w-full max-w-lg rounded-[20px] bg-[#0C0F0E] pt-6 pb-10 px-6">
            <div className="flex justify-end">
              <button
                onClick={() => props.setIsOpen(false)}
                className={twMerge(
                  "bg-[#393B3A] rounded-full w-7 h-7",
                  "flex items-center justify-center remove-highlight"
                )}
              >
                <IoClose className="text-white " />
              </button>
            </div>
            <Dialog.Title className="flex justify-center">
              <Image
                src="/assets/logo.svg"
                alt="Foniso Logo"
                width={113.3}
                height={26.34}
              />
            </Dialog.Title>
            <Dialog.Description className="h3-text text-colorWhite py-8 text-center">
              Download foniso app on
            </Dialog.Description>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 pt-2">
              <Link
                href="https://play.google.com/store/apps/details?id=team.foniso.app"
                target="_blank"
                rel="noreferrer"
                type="button"
                className={twMerge(
                  "bg-colorWhite rounded-3xl text-darkGrey cta-text",
                  "flex justify-center pb-3 pt-2.5 px-4 items-center"
                )}
              >
                <AdvancedImage
                  cldImg={cld.image("foniso/playstore")}
                  className="w-7"
                />
                <span className="pl-2">Download on Android</span>
              </Link>
              <Link
                href="https://apps.apple.com/us/app/foniso/id6478035444"
                target="_blank"
                rel="noreferrer"
                type="button"
                className={twMerge(
                  "bg-colorWhite rounded-3xl text-darkGrey cta-text",
                  "flex justify-center pb-3.5 pt-2.5 px-5 items-center"
                )}
              >
                <AdvancedImage
                  cldImg={cld.image("foniso/apple")}
                  className="w-7"
                />
                <span className="pl-2">Download on iOS</span>
              </Link>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
