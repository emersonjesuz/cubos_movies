import * as Form from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "../../schemas/login";
import api from "../../api/axios";
import { handlerErrorApi } from "../../utils/handlerErrorApi";
import { FormInput } from "../formInput";

export default function LoginComponents() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginInput) {
    try {
      const { data } = await api.post("/auth/login", values);
      localStorage.setItem("token", data.token);
    } catch (error) {
      const message = handlerErrorApi(error);
      setError("email", { message });
    }
  }

  return (
    <div className="flex items-center justify-center h-full p-4">
      <Form.Root asChild>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:w-[412px] w-[382px] h-[242px] bg-[#232225] p-4 rounded shadow-md gap-3"
        >
          <FormInput label="E-mail" name="email" type="email" register={register("email")} error={errors.email} />
          <FormInput label="Senha" name="password" type="password" register={register("password")} error={errors.password} />
          <div className="flex items-center justify-between w-full h-11 ">
            <a href="#" className="text-purple-500 text-[16px] underline">
              Esqueci minha senha
            </a>
            <Form.Submit asChild>
              <button className="w-[83px] h-full bg-[#8E4EC6] text-white rounded">Entrar</button>
            </Form.Submit>
          </div>
        </form>
      </Form.Root>
    </div>
  );
}
