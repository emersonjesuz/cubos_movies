import axios from "axios";

export const errorMessages: { [key: string]: string } = {
  EMAIL_PASSWORD_INCORRECT: "Nome/E-mail ou senha incorretos.",
  USER_NOT_FOUND: "Usuário não encontrado.",
  USER_ALREADY_EXISTS: "Usuário já cadastrado.",
  EMAIL_IS_INVALID: "O e-mail informado é inválido.",
  PASSWORD_IS_INVALID: "A senha deve ter pelo menos 6 caracteres.",
  UNKNOWN_ERROR: "Ocorreu um erro inesperado. Tente novamente.",
  NETWORK_ERROR: "Falha de conexão. Verifique sua internet.",
};

export function handlerErrorApi(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.message === "Network Error") {
      return errorMessages["NETWORK_ERROR"];
    }
    const code: string = error.response?.data.code || "";
    const statusCode = error.response?.status;
    if (statusCode === 401) {
      localStorage.removeItem("token");
      return errorMessages["UNKNOWN_ERROR"];
    }

    if (statusCode === 500) {
      localStorage.removeItem("token");
      return errorMessages["UNKNOWN_ERROR"];
    }
    if (code && errorMessages[code]) {
      return errorMessages[code];
    }
  }
  return errorMessages["UNKNOWN_ERROR"];
}
