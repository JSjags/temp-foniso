"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "../ui/scroll-area";

export type ComboboxOptions = {
  value: string;
  label: string;
};

type Mode = "single" | "multiple";

interface ComboboxProps {
  mode?: Mode;
  options: ComboboxOptions[];
  selected: string | string[]; // Updated to handle multiple selections
  className?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  onChange?: (event: string | string[]) => void; // Updated to handle multiple selections
  extraAction?: (value: string) => void; // For extra actions when handling change event
  onCreate?: (value: string) => void;
}

export function MyComboBox({
  options,
  selected,
  className,
  placeholder,
  searchPlaceholder,
  mode = "single",
  extraAction,
  onChange,
  onCreate,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState<string>("");

  const handleSelectedOption = (option: { label: string; value: string }) => {
    if (Array.isArray(selected) && mode !== "single" && selected.length) {
      return selected.includes(option.value);
    } else {
      return (selected as string).toLowerCase() === option.value.toLowerCase();
    }
  };

  return (
    <div className={cn("block", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            key={"combobox-trigger"}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between bg-transparent border-foreground/50 mt-2 w-full h-[54px] capitalize text-base text-semibold"
          >
            {selected && selected.length > 0 ? (
              <div className="relative mr-auto flex flex-grow flex-wrap items-center overflow-hidden">
                <span>
                  {mode === "multiple" && Array.isArray(selected)
                    ? selected
                        .map(
                          (selectedValue: string) =>
                            options.find((item) => item.value === selectedValue)
                              ?.label
                        )
                        .join(", ")
                    : mode === "single" &&
                      options.find((item) => item.value === selected)?.label}
                </span>
              </div>
            ) : (
              placeholder ?? "Select Item..."
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0 bg-background">
          <Command
            className="w-full bg-background"
            filter={(value, search) => {
              if (value.includes(search)) return 1;
              return 0;
            }}
            // shouldFilter={true}
          >
            <CommandInput
              placeholder={searchPlaceholder ?? "Search..."}
              value={query}
              onValueChange={setQuery}
            />
            <CommandEmpty
              onClick={() => {
                if (onCreate) {
                  onCreate(query);
                  setQuery("");
                }
              }}
              className="flex cursor-pointer items-center justify-center gap-1 italic"
            >
              <p>No result found for </p>
              <span className="block max-w-48 pr-2 truncate font-semibold text-primary">
                {query}
              </span>
            </CommandEmpty>
            <ScrollArea>
              <div className="max-h-80">
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.label}
                      value={option.label}
                      onSelect={(currentValue) => {
                        if (onChange) {
                          if (mode === "multiple" && Array.isArray(selected)) {
                            onChange(
                              selected.includes(option.value)
                                ? selected.filter(
                                    (item) => item !== option.value
                                  )
                                : [...selected, option.value]
                            );
                          } else {
                            onChange(option.value);
                            if (extraAction) {
                              extraAction(option.label.split(" ")[0]);
                            }
                          }
                        }
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          handleSelectedOption(option)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
