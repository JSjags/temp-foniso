"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const desktop = "(min-width: 768px)";

interface DropdownProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children?: React.ReactNode;
}

interface RootDropdownProps extends DropdownProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DropdownDrawer = ({ children, ...props }: RootDropdownProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DropdownMenuPrimitive.Root : Drawer;

  return <Component {...(props as any)}>{children}</Component>;
};

const DropdownDrawerTrigger = ({
  className,
  children,
  ...props
}: DropdownProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DropdownMenuPrimitive.Trigger : DrawerTrigger;

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

const DropdownDrawerContent = ({
  className,
  children,
  ...props
}: DropdownProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DropdownMenuPrimitive.Content : DrawerContent;

  return (
    <Component className={className} {...(props as any)}>
      {children}
    </Component>
  );
};

const DropdownDrawerItem = ({
  className,
  children,
  ...props
}: DropdownProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DropdownMenuPrimitive.Item : "div";

  return (
    <Component className={className} {...(props as any)}>
      {children}
    </Component>
  );
};

const DropdownDrawerCheckboxItem = ({
  className,
  children,
  checked,
  ...props
}: DropdownProps & { checked?: boolean }) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DropdownMenuPrimitive.CheckboxItem : "div";

  return (
    <Component className={className} checked={checked} {...(props as any)}>
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </Component>
  );
};

const DropdownDrawerRadioItem = ({
  className,
  children,
  ...props
}: DropdownProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DropdownMenuPrimitive.RadioItem : "div";

  return (
    <Component className={className} {...(props as any)}>
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </Component>
  );
};

const DropdownDrawerLabel = ({
  className,
  children,
  ...props
}: DropdownProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DropdownMenuPrimitive.Label : "div";

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

const DropdownDrawerSeparator = ({ className, ...props }: DropdownProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DropdownMenuPrimitive.Separator : "hr";

  return <Component className={className} {...props} />;
};

// const DropdownDrawerShortcut = ({
//   className,
//   children,
//   ...props
// }: DropdownProps) => {
//   const isDesktop = useMediaQuery(desktop);
//   const Component = isDesktop ? DropdownMenuPrimitive. : "span";

//   return (
//     <Component className={className} {...props}>
//       {children}
//     </Component>
//   );
// };

const DropdownDrawerGroup = ({
  className,
  children,
  ...props
}: DropdownProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DropdownMenuPrimitive.Group : "div";

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

const DropdownDrawerPortal = ({
  className,
  children,
  ...props
}: DropdownProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DropdownMenuPrimitive.Portal : "div";

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

const DropdownDrawerSub = ({
  className,
  children,
  ...props
}: DropdownProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DropdownMenuPrimitive.Sub : "div";

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

const DropdownDrawerSubContent = ({
  className,
  children,
  ...props
}: DropdownProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DropdownMenuPrimitive.SubContent : "div";

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

const DropdownDrawerSubTrigger = ({
  className,
  children,
  ...props
}: DropdownProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DropdownMenuPrimitive.SubTrigger : "div";

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

const DropdownDrawerRadioGroup = ({
  className,
  children,
  ...props
}: DropdownProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DropdownMenuPrimitive.RadioGroup : "div";

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

export {
  DropdownDrawer,
  DropdownDrawerTrigger,
  DropdownDrawerContent,
  DropdownDrawerItem,
  DropdownDrawerCheckboxItem,
  DropdownDrawerRadioItem,
  DropdownDrawerLabel,
  DropdownDrawerSeparator,
  //   DropdownDrawerShortcut,
  DropdownDrawerGroup,
  DropdownDrawerPortal,
  DropdownDrawerSub,
  DropdownDrawerSubContent,
  DropdownDrawerSubTrigger,
  DropdownDrawerRadioGroup,
};
