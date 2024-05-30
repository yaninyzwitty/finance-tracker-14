"use client";
import * as React from "react";
import {format} from "date-fns";
import {Calendar as CalenderIcon} from "lucide-react";
import {SelectSingleEventHandler} from "react-day-picker";
import {Button} from "./ui/button";
import {Calendar} from "./ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover";
import {cn} from "@/lib/utils";

type Props = {
  value?: Date;
  onChange?: SelectSingleEventHandler;
  disabled?: boolean;
};

function DatePicker({disabled, onChange, value}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal ",
            !value && "text-muted-foreground"
          )}
        >
          <CalenderIcon className="mr-2 size-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
