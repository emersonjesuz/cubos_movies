import * as Form from "@radix-ui/react-form";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
}

export function FormInput({ label, name, placeholder, type = "text", error, register }: FormInputProps) {
  function shrinkErrorMessage(message: string = "") {
    return message.length <= 45 ? message : message.slice(0, 45);
  }
  return (
    <Form.Field className="grid gap-2" name={name}>
      <div className="flex items-baseline justify-between h-fit">
        <Form.Label className="text-[12.8px] font-medium text-white min-w-fit mr-1.5">{label}</Form.Label>
        {error ? (
          <span className="text-[10px] text-red-400 w-[200px] text-end  whitespace-nowrap truncate ">
            {shrinkErrorMessage(error.message)}
          </span>
        ) : (
          <Form.Message className="text-[12.8px] text-[#6F6D78] opacity-80" match="valueMissing">
            {`Digite seu ${label.toLowerCase()}`}
          </Form.Message>
        )}
      </div>
      <Form.Control asChild>
        <input
          {...register}
          type={type}
          placeholder={placeholder || label}
          required
          className="w-full h-11 rounded px-3 bg-blackA2 text-white placeholder:text-[16px] placeholder:text-[#6F6D78] border border-[#3C393F] bg-[#1A191B] outline-none"
        />
      </Form.Control>
    </Form.Field>
  );
}
