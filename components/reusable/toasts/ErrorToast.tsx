import { formatString } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";
import toast, { Toast } from "react-hot-toast";

type Props = {
  t: Toast;
  message: string;
  id?: string;
};

const ErrorToast = ({ t, message }: Props) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-background font-sans text-foreground border border-border shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-2 min-[480px]:p-4">
        <div className="flex items-start">
          {/* <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
              alt=""
            />
          </div> */}
          <div className="ml-3 flex-1">
            <p className="text-sm text-red-500/80 font-semibold">Error</p>
            <p className="mt-1 text-xs min-[480px]:text-sm text-foreground/70">
              {formatString(message)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-border">
        <div className="flex min-[480px]:border-l border-border">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="hidden w-full border border-transparent rounded-none rounded-r-lg p-4 min-[480px]:flex items-center justify-center text-sm font-medium text-foreground/70 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-text-red-500/80"
          >
            Close
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-2 min-[480px]:hidden items-center justify-center text-sm font-medium text-foreground/70 hover:text-foreground focus:outline-none"
          >
            <X size={14} className="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorToast;
