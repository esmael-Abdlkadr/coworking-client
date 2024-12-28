import { Input } from "./input";
import { Label } from "./label";
interface CustomeInputProps {
  label: string;
  type: string;
  placeholder: string;
  id: string;
}
function CustomeInput({ label, type, placeholder, id }: CustomeInputProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        className="px-5  bg-white text-[#6b7280] border-none rounded-md shadow-sm  text-xl"
      />
    </div>
  );
}

export default CustomeInput;
