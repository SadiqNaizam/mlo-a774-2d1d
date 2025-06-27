"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { addDays, format, subDays } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: DateRange;
  onDateChange: (date: DateRange | undefined) => void;
}

export function DateRangePicker({
  className,
  date,
  onDateChange,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    console.log('DateRangePicker loaded');
  }, []);

  const handlePreset = (preset: 'today' | 'last7' | 'last30') => {
    const now = new Date();
    let newRange: DateRange | undefined;

    switch (preset) {
      case 'today':
        newRange = { from: now, to: now };
        break;
      case 'last7':
        newRange = { from: subDays(now, 6), to: now };
        break;
      case 'last30':
        newRange = { from: subDays(now, 29), to: now };
        break;
      default:
        break;
    }
    onDateChange(newRange);
    setIsOpen(false);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 flex" align="start">
          <div className="flex flex-col space-y-2 p-4 border-r">
            <h4 className="text-sm font-medium">Presets</h4>
            <Button variant="ghost" className="justify-start" onClick={() => handlePreset('today')}>Today</Button>
            <Button variant="ghost" className="justify-start" onClick={() => handlePreset('last7')}>Last 7 Days</Button>
            <Button variant="ghost" className="justify-start" onClick={() => handlePreset('last30')}>Last 30 Days</Button>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => {
              onDateChange(range);
              // Close popover only when a full range is selected
              if (range?.from && range?.to) {
                setIsOpen(false);
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DateRangePicker;