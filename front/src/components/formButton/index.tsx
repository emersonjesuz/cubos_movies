import * as Form from "@radix-ui/react-form";

interface FormButtonProps {
  label: string;
  className?: string;
}

export function FormButton({ label, className }: FormButtonProps) {
  return (
    <Form.Submit asChild>
      <button className={`w-[83px] h-full bg-[#8E4EC6] text-white rounded ${className || ""}`}>{label}</button>
    </Form.Submit>
  );
}
