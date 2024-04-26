"use client";

import { ReactNode } from "react";
import { Drawer } from "vaul";

type Props = {
  open: boolean;
  children: ReactNode;
  close: () => void;
};

const MobileDrawer = (props: Props) => {
  return (
    <Drawer.Root open={props.open} onClose={props.close}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-white dark:bg-[#111413] flex flex-col rounded-t-[10px] h-auto mt-24 fixed z-[200] bottom-0 left-0 right-0">
          <div className="p-4 border border-border rounded-t-[30px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-[#393939] mb-8" />
            <div className="max-w-md mx-auto">{props.children}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default MobileDrawer;
