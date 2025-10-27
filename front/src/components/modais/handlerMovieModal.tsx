/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@radix-ui/react-form";
import { Dialog } from "radix-ui";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { movieSchema, type MovieSchema } from "../../schemas/handlerMovie";
import { handlerErrorApi } from "../../utils/handlerErrorApi";
import { FormInput } from "../formInput";
import { FormImageInput } from "../formInputImage";
import CloseIcon from "../icons/CloseIcon";
import { useMovieStore } from "../../zustand/moviesStore";

interface Props {
  children: React.ReactNode;
  type: "CREATE" | "UPDATE";
  id?: string;
}

export default function HandlerMovieModal({ children, type, id }: Props) {
  const [open, setOpen] = useState(false);
  const { movie, setMovie } = useMovieStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MovieSchema>({
    resolver: zodResolver(movieSchema) as any,
  });

  async function onSubmit(values: MovieSchema) {
    try {
      const genresArray = (values.genres as unknown as string)
        .split(",")
        .map((genre) => genre.trim())
        .filter((g) => g.length > 0);

      const payload = {
        ...values,
        genres: genresArray,
      };
      if (type === "CREATE") {
        await api.post("/movie", payload);
        alert("Filme Criando com sucesso");
      } else {
        const { data } = await api.put("/movie/" + id, payload);
        setMovie(data);
        alert("Filme Editado com sucesso");
      }
      setOpen(false);
    } catch (error) {
      const message = handlerErrorApi(error);
      alert(message);
    }
  }

  useEffect(() => {
    const messageList = Object.values(errors);
    if (messageList.length) {
      alert(messageList[0].message);
    }
  }, [errors]);

  useEffect(() => {
    if (type === "UPDATE" && movie) {
      const genresString = Array.isArray(movie.genres) ? movie.genres.join(", ") : movie.genres;
      reset({
        urlCover: movie.urlCover || "",
        urlBackground: movie.urlBackground || "",
        title: movie.title || "",
        originalTitle: movie.originalTitle || "",
        synopsis: movie.synopsis || "",
        description: movie.description || "",
        popularity: movie.popularity?.toString() || "",
        approvalRating: movie.approvalRating?.toString() || "",
        release: movie.release || "",
        duration: movie.duration?.toString() || "",
        budget: movie.budget || 0,
        revenue: movie.revenue || 0,
        profit: movie.profit || 0,
        language: movie.language || "",
        status: movie.status || "",
        urlTrailer: movie.urlTrailer || "",
        director: movie.director || "",
        ageRating: movie.ageRating || "",
        genres: genresString || "",
      });
    }
  }, [type, movie, reset]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-overlayShow" />

        <Dialog.Content className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col md:w-[563px] w-[382px] h-full min-h-screen bg-[#232225] p-4 gap-6 data-[state=open]:animate-contentShow rounded">
          <div className="flex justify-between items-center w-full">
            <Dialog.Title className="lg:text-[22px] text-[18px] font-medium">
              {type === "CREATE" ? "Cadastrar Filme" : "Editar Filme"}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="flex items-center justify-center" aria-label="Fechar">
                <CloseIcon />
              </button>
            </Dialog.Close>
          </div>

          <Form.Root asChild>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#3b3b3b] w-full "
            >
              <FormImageInput label="Capa" name="urlCover" register={register("urlCover")} />
              <FormImageInput label="Plano de Fundo" name="urlBackground" register={register("urlBackground")} />
              <FormInput label="Título" name="title" type="text" register={register("title")} />
              <FormInput label="Título Original" name="originalTitle" type="text" register={register("originalTitle")} />
              <FormInput label="Sinopse" name="synopsis" type="text" register={register("synopsis")} />
              <FormInput label="Descrição" name="description" type="text" register={register("description")} />
              <FormInput label="Popularidade" name="popularity" type="text" register={register("popularity")} />
              <FormInput label="Avaliação de Aprovação" name="approvalRating" type="text" register={register("approvalRating")} />
              <FormInput label="Lançamento" name="release" type="datetime-local" register={register("release")} />
              <FormInput label="Duração (minutos)" name="duration" type="text" register={register("duration")} />
              <FormInput label="Orçamento" name="budget" type="number" register={register("budget")} />
              <FormInput label="Receita" name="revenue" type="number" register={register("revenue")} />
              <FormInput label="Lucro" name="profit" type="number" register={register("profit")} />
              <FormInput label="Votos" name="votes" type="number" register={register("votes")} />
              <FormInput label="Idioma" name="language" type="text" register={register("language")} />
              <FormInput label="Status" name="status" type="text" register={register("status")} />
              <FormInput label="URL do Trailer" name="urlTrailer" type="url" register={register("urlTrailer")} />
              <FormInput label="Diretor" name="director" type="text" register={register("director")} />
              <FormInput label="Classificação Indicativa" name="ageRating" type="text" register={register("ageRating")} />
              <FormInput label="Gêneros (separados por vírgula)" name="genres" type="text" register={register("genres")} />
              <div className="flex items-center justify-end gap-3 min-h-[60px]">
                <Dialog.Close asChild>
                  <button className="w-[98px] h-11 hover:bg-[#C150FF2E] bg-[#B744F714] focus:bg-[#B412F90A] cursor-pointer text-white rounded">
                    Cancelar
                  </button>
                </Dialog.Close>

                <button
                  type="submit"
                  className="w-[139px] h-11 bg-[#8E4EC6] hover:bg-[#9A5CD0] focus:bg-[#8457AA] cursor-pointer text-white rounded"
                >
                  {type === "CREATE" ? "Adicionar Filme" : "Editar Filme"}
                </button>
              </div>
            </form>
          </Form.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
