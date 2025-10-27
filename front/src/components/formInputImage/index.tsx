import * as React from "react";
import * as Form from "@radix-ui/react-form";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import api from "../../api/axios";
import { handlerErrorApi } from "../../utils/handlerErrorApi";

interface FormImageInputProps {
  label: string;
  name: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
}

export function FormImageInput({ label, name, error, register }: FormImageInputProps) {
  const [preview, setPreview] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("arquivo", file);
      const { data } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrl = data.url;
      register.onChange({
        target: { name, value: imageUrl },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    } catch (error) {
      const message = handlerErrorApi(error);
      alert(message);
      setPreview(null);
    } finally {
      setLoading(false);
    }
  }

  function shrinkErrorMessage(message: string = "") {
    return message.length <= 45 ? message : message.slice(0, 45);
  }

  return (
    <Form.Field className="grid gap-2" name={name}>
      <div className="flex items-baseline justify-between h-fit">
        <Form.Label className="text-[12.8px] font-medium text-white min-w-fit mr-1.5">{label}</Form.Label>
        {error ? (
          <span className="text-[10px] text-red-400 w-[200px] text-end whitespace-nowrap truncate">
            {shrinkErrorMessage(error.message)}
          </span>
        ) : (
          <Form.Message className="text-[12.8px] text-[#6F6D78] opacity-80" match="valueMissing">
            {`Envie uma ${label.toLowerCase()}`}
          </Form.Message>
        )}
      </div>

      <Form.Control asChild>
        <div className="flex flex-col items-center justify-center gap-3 w-full h-40 border border-[#3C393F] bg-[#1A191B] rounded cursor-pointer relative overflow-hidden">
          <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleUpload} />
          {loading ? (
            <span className="text-[#6F6D78] text-[14px] text-center">Enviando imagem...</span>
          ) : preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded" />
          ) : (
            <span className="text-[#6F6D78] text-[14px] text-center p-2">Clique para enviar imagem</span>
          )}
        </div>
      </Form.Control>
    </Form.Field>
  );
}
