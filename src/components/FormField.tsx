import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CustomFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>; 
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function CustomFormField<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  disabled,
}: CustomFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input 
              type={type} 
              placeholder={placeholder} 
              disabled={disabled} 
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}