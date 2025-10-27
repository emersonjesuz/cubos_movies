import axios from "axios";

export const errorMessages: { [key: string]: string } = {
  EMAIL_PASSWORD_INCORRECT: "Nome, e-mail ou senha estão incorretos.",
  USER_NOT_FOUND: "Usuário não encontrado.",
  USER_ALREADY_EXISTS: "Este usuário já está cadastrado.",
  EMAIL_IS_INVALID: "O e-mail informado não é válido.",
  PASSWORD_IS_INVALID: "A senha deve ter pelo menos 6 caracteres.",
  UNKNOWN_ERROR: "Ocorreu um erro inesperado. Tente novamente.",
  NETWORK_ERROR: "Não foi possível conectar. Verifique sua internet.",
  TITLE_IS_OBLIGATORY: "O título do filme é obrigatório.",
  TITLE_IS_EMPTY: "O título do filme não pode estar vazio.",
  ORIGINAL_TITLE_IS_OBLIGATORY: "O título original do filme é obrigatório.",
  ORIGINAL_TITLE_IS_EMPTY: "O título original do filme não pode estar vazio.",
  SYNOPSIS_IS_OBLIGATORY: "A sinopse do filme é obrigatória.",
  SYNOPSIS_IS_EMPTY: "A sinopse do filme não pode estar vazia.",
  DESCRIPTION_IS_OBLIGATORY: "A descrição do filme é obrigatória.",
  DESCRIPTION_IS_EMPTY: "A descrição do filme não pode estar vazia.",
  POPULARITY_IS_OBLIGATORY: "A popularidade do filme é obrigatória.",
  POPULARITY_IS_EMPTY: "O campo de popularidade não pode estar vazio.",
  RELEASE_IS_INVALID: "A data de lançamento informada não é válida.",
  BUDGET_IS_OBLIGATORY: "O orçamento do filme é obrigatório.",
  BUDGET_IS_NEGATIVE: "O orçamento do filme não pode ser negativo.",
  REVENUE_IS_OBLIGATORY: "A receita do filme é obrigatória.",
  REVENUE_IS_NEGATIVE: "A receita do filme não pode ser negativa.",
  VOTES_IS_OBLIGATORY: "O número de votos é obrigatório.",
  VOTES_IS_NOT_INTEGER: "O número de votos deve ser um número inteiro.",
  VOTES_IS_NEGATIVE: "O número de votos não pode ser negativo.",
  DURATION_IS_OBLIGATORY: "A duração do filme é obrigatória.",
  DURATION_IS_EMPTY: "A duração do filme não pode estar vazia.",
  DURATION_MUST_BE_NUMBER: "A duração deve ser informada em minutos (somente números).",
  LANGUAGE_IS_OBLIGATORY: "O idioma do filme é obrigatório.",
  LANGUAGE_IS_EMPTY: "O idioma do filme não pode estar vazio.",
  PROFIT_IS_INVALID: "O lucro do filme deve ser um número válido.",
  STATUS_IS_OBLIGATORY: "O status do filme é obrigatório.",
  STATUS_IS_EMPTY: "O status do filme não pode estar vazio.",
  URL_COVER_IS_OBLIGATORY: "A URL da capa do filme é obrigatória.",
  URL_COVER_IS_INVALID: "A URL da capa do filme não é válida.",
  URL_BACKGROUND_IS_OBLIGATORY: "A URL do background do filme é obrigatória.",
  URL_BACKGROUND_IS_INVALID: "A URL do background do filme não é válida.",
  URL_TRAILER_IS_OBLIGATORY: "A URL do trailer do filme é obrigatória.",
  URL_TRAILER_IS_INVALID: "A URL do trailer do filme não é válida.",
  APPROVAL_RATING_IS_OBLIGATORY: "A avaliação do filme é obrigatória.",
  APPROVAL_RATING_IS_EMPTY: "A avaliação do filme não pode estar vazia.",
  GENRES_IS_INVALID: "Os gêneros informados devem ser uma lista de nomes válidos.",
  GENRE_NAME_IS_EMPTY: "O nome de cada gênero não pode estar vazio.",
  GENRES_IS_OBLIGATORY: "É necessário informar ao menos um gênero.",
  AGE_RATING_INVALID: "A classificação indicativa deve ser L, 12, 14 ou 18.",
  DIRECTOR_IS_OBLIGATORY: "O diretor do filme é obrigatório.",
  DIRECTOR_IS_EMPTY: "O nome do diretor não pode estar vazio.",
  SEARCH_IS_OBLIGATORY: "O campo de busca é obrigatório.",
  START_RELEASE_IS_INVALID: "A data inicial de lançamento não é válida.",
  END_RELEASE_IS_INVALID: "A data final de lançamento não é válida.",
  TYPE_IS_INVALID: "O tipo de filtro informado não é válido.",
  PAGE_MUST_BE_NUMBER: "O número da página deve ser um número.",
  PAGE_MUST_BE_INTEGER: "O número da página deve ser um número inteiro.",
  PAGE_MIN_1: "O número da página deve ser maior que 0.",
  INVALID_RELEASE_DATE_FILTER: "A data de lançamento inicio não pode ser maior que a data final",
  MOVIE_NOT_FOUND: "Filme não encontrado.",
  FORMAT_FILE_INVALID: "Envie apenas arquivos PNG ou JPG!",
  FILE_INVALID: "Arquivo inválido ou ausente",
  UNAUTHORIZED: "Token inválido ou expirado.",
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
