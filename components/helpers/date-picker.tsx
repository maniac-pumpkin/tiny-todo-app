import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { formatDate } from "@/lib/utils"
import { addDays, formatISO, parseISO } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { Input } from "../ui/input"

type PropsType = {
  name: string
  defaultValue?: string
}

function DatePicker({ name, defaultValue }: PropsType) {
  const [date, setDate] = useState(() => {
    const currentDate = new Date()

    const nextDay = addDays(currentDate, 1)

    return defaultValue ? parseISO(defaultValue) : nextDay
  })

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDate(date)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(day) => day && setDate(day)}
            disabled={(date) => date < new Date()}
          />
        </PopoverContent>
      </Popover>
      <Input type="hidden" name={name} value={formatISO(date)} />
    </>
  )
}

export default DatePicker
