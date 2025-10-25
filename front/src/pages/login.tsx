import * as Form from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "../schemas/login";
import api from "../api/axios";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginInput) {
    try {
      const { data } = await api.post("/auth/login", values);
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center h-full p-4">
      <Form.Root asChild>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:w-[412px] w-[382px] h-[242px] bg-[#232225] p-4 rounded shadow-md gap-3"
        >
          <Form.Field className="grid gap-2" name="email">
            <div className="flex items-baseline justify-between h-fit">
              <Form.Label className="text-[12.8px] font-medium text-white">Nome/E-mail</Form.Label>
              {errors.email ? (
                <span className="text-[13px] text-red-400"> {errors.email.message}</span>
              ) : (
                <Form.Message className="text-[12.8px] text-[#6F6D78] opacity-80" match="valueMissing">
                  Digite seu nome ou e-mail
                </Form.Message>
              )}
            </div>
            <Form.Control asChild>
              <input
                {...register("email")}
                type="email"
                placeholder="Digite seu nome/E-mail"
                required
                className="w-full h-11 rounded px-3 bg-blackA2 text-white placeholder:text-[16px] placeholder:text-[#6F6D78] border border-[#3C393F] bg-[#1A191B] outline-none"
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className="grid gap-2" name="password">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[12.8px] font-medium text-white">Senha</Form.Label>
              {errors.password ? (
                <span className="text-[12.8px] text-red-400"> {errors.password.message}</span>
              ) : (
                <Form.Message className="text-[12.8px] text-[#6F6D78] opacity-80" match="valueMissing">
                  Digite sua senha
                </Form.Message>
              )}
            </div>
            <Form.Control asChild>
              <input
                {...register("password")}
                type="password"
                placeholder="Digite sua senha"
                required
                className="w-full h-11 rounded px-3 bg-blackA2 text-white placeholder:text-[16px] placeholder:text-[#6F6D78] border border-[#3C393F] bg-[#1A191B] outline-none"
              />
            </Form.Control>
          </Form.Field>

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
