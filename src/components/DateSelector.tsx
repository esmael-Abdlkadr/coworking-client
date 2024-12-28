// import * as React from "react";
// import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";

// import { cn } from "@/lib/utils";

// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Label } from "./ui/label";

// export function DatePicker() {
//   const [date, setDate] = React.useState<Date>();

//   return (
//     <div className="grid  gap-2 w-full">
//       <Label>Select Date and Time</Label>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             variant={"outline"}
//             className={cn(
//               "w-[300px] py- justify-start text-left text-xl",
//               !date && "text-muted-foreground"
//             )}
//           >
//             <CalendarIcon className="mr-2 h-6 w-6" />
//             {date ? format(date, "PPP") : <span>Pick a date</span>}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0">
//           <Calendar
//             mode="single"
//             selected={date}
//             onSelect={setDate}
//             initialFocus
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }
