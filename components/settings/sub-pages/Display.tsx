import React from "react";
import NavList from "../NavList";
import DetailCard from "../DetailCard";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { ModeToggle } from "@/components/ThemeToggle";
import { Computer, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type Props = {};

const item_list = [
  {
    //   icon: MessageSquareTextIcon,
    count: 5,
    label: "App theme",
    desc: "Dark Mode",
    href: "app-theme",
  },
  {
    //   icon: Ban,
    count: 5,
    label: "Languages",
    desc: "Choose application language",
    href: "languages",
  },
];
const Display = (props: Props) => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="mt-5 min-h-screen bg-background">
      {item_list.map(({ count, desc, href, label }) => {
        if (label !== "App theme") {
          return (
            <DetailCard
              key={label}
              label={label}
              href={href as string}
              // count={generateCount(href ?? "")}
              desc={desc}
            />
          );
        }
        return (
          <div key={label}>
            <Credenza>
              <CredenzaTrigger asChild>
                <button>
                  <span className="block flex-1 cursor-pointer">
                    <span className="font-medium block"> App theme </span>
                    <span className="font-sm text-[#888888] dark:text-[#AFAFAF] block">
                      Dark mode
                    </span>
                  </span>
                </button>
              </CredenzaTrigger>
              <CredenzaContent>
                <CredenzaHeader>
                  <CredenzaTitle>Choose theme</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody>
                  <RadioGroup defaultValue={theme}>
                    <div className="z-50 py-2 rounded-lg space-y-5">
                      <Label className="flex items-center gap-3">
                        <div className="flex-1 flex items-center">
                          <Sun className="size-[1.5rem] mr-4 rotate-0 scale-100 transition-all duration-700 dark:-rotate-90" />
                          <span>Light</span>
                        </div>
                        <RadioGroupItem
                          value="light"
                          className="data-[highlighted]:bg-[#393D39] flex items-center gap-2 shrink-0 justify-center"
                          onClick={() => setTheme("light")}
                        />
                      </Label>
                      <Label className="flex items-center gap-3">
                        <div className="flex-1 flex items-center">
                          <Moon className="size-[1.5rem] mr-4 rotate-90 transition-all dark:rotate-0 duration-700 dark:scale-100" />
                          <span>Dark</span>
                        </div>
                        <RadioGroupItem
                          value="dark"
                          className="data-[highlighted]:bg-[#393D39] flex items-center gap-2 shrink-0 justify-center"
                          onClick={() => setTheme("dark")}
                        />
                      </Label>
                      <Label className="flex items-center gap-3">
                        <div className="flex-1 flex items-center">
                          <Computer className="size-[1.5rem] mr-4 transition-all dark:scale-100" />
                          <span>System</span>
                        </div>
                        <RadioGroupItem
                          value="system"
                          className="data-[highlighted]:bg-[#393D39] flex items-center gap-2 shrink-0 justify-center"
                          onClick={() => setTheme("system")}
                        />
                      </Label>
                    </div>
                  </RadioGroup>
                </CredenzaBody>
                <CredenzaFooter>
                  <CredenzaClose asChild>
                    <button>Close</button>
                  </CredenzaClose>
                </CredenzaFooter>
              </CredenzaContent>
            </Credenza>
          </div>
        );
      })}
    </div>
  );
};

export default Display;
