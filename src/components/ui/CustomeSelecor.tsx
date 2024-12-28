import { Label } from "./label";
import { InputSelector } from "./InputSelector";
interface CustomeSelecorProps {
  label: string;
  id: string;
  placeholder: string;
}
function CustomeSelecor({ label, id, placeholder }: CustomeSelecorProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-2  focus:ring-primary-600 focus:border-primary-600">
      <Label htmlFor={id}>{label}</Label>
      <InputSelector placeholder={placeholder} />
    </div>
  );
}

export default CustomeSelecor;
