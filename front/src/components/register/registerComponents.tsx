import * as Form from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../api/axios";
import { handlerErrorApi } from "../../utils/handlerErrorApi";
import { FormButton } from "../formButton";
import { FormInput } from "../formInput";
import { registerUserSchema, type RegisterUserInput } from "../../schemas/register";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterComponents() {
  const [messageErro, setMessageError] = useState("");
  const token = localStorage.getItem("token");
  const router = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserInput>({
    resolver: zodResolver(registerUserSchema),
  });
  async function onSubmit(values: RegisterUserInput) {
    try {
      await api.post("/auth/register", values);
      router("/login");
    } catch (error) {
      const message = handlerErrorApi(error);
      setMessageError(message);
    }
  }

  useEffect(() => {
    if (token) {
      router("/");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-full p-4">
      <Form.Root asChild>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:w-[412px] w-[382px] h-[408px] bg-[#232225] p-4 rounded shadow-md gap-3"
        >
          <FormInput label="Nome" name="name" type="text" register={register("name")} error={errors.name} />
          <FormInput label="E-mail" name="email" type="email" register={register("email")} error={errors.email} />
          <FormInput label="Senha" name="password" type="password" register={register("password")} error={errors.password} />
          <FormInput
            label="Confirmação de senha"
            name="confirmPassword"
            type="password"
            register={register("confirmPassword")}
            error={errors.confirmPassword}
          />

          <div className="flex items-center justify-between w-full h-11">
            <p className="text-red-400 text-[12px]">{messageErro}</p>
            <FormButton label="Entrar" />
          </div>
        </form>
      </Form.Root>
    </div>
  );
}
