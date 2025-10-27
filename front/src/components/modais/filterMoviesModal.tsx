import * as Form from "@radix-ui/react-form";
import { Dialog } from "radix-ui";
import * as React from "react";
import CloseIcon from "../icons/CloseIcon";
import { useMovieFilterStore } from "../../zustand/filterMoviesStore";

interface Props {
  children: React.ReactNode;
}

export default function FilterMoviesModal({ children }: Props) {
  const { setAgeRating, setDuration, setStartRelease, setEndRelease, setShow, show } = useMovieFilterStore();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 data-[state=open]:animate-overlayShow flex items-center justify-center bg-black/30" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded focus:outline-none data-[state=open]:animate-contentShow flex flex-col md:w-[412px] w-[382px] h-[490px] bg-[#232225] p-4 gap-6">
          <div className="flex justify-between items-center w-full">
            <Dialog.Title className="lg:text-[24px] text-[16px]">Filtros</Dialog.Title>
            <Dialog.Close asChild>
              <button className="flex items-center justify-center cursor-pointer" aria-label="Close">
                <CloseIcon />
              </button>
            </Dialog.Close>
          </div>

          <div className="grid h-full gap-4">
            <div className="grid gap-2">
              <div className="flex items-baseline justify-between h-fit">
                <label htmlFor="duration" className="text-[12.8px] font-medium text-white min-w-fit mr-1.5">
                  Duração
                </label>
              </div>
              <input
                id="duration"
                name="duration"
                type="text"
                className="w-full h-11 focus:border-[#8E4EC6] rounded px-3 bg-blackA2 text-white placeholder:text-[16px] placeholder:text-[#6F6D78] border border-[#3C393F] outline-none"
                placeholder="Duração"
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-baseline justify-between h-fit">
                <label htmlFor="startRelease" className="text-[12.8px] font-medium text-white min-w-fit mr-1.5">
                  Data de Lançamento Início
                </label>
              </div>
              <input
                onChange={(e) => setStartRelease(new Date(e.target.value))}
                id="startRelease"
                name="startRelease"
                type="date"
                className="w-full focus:border-[#8E4EC6] h-11 rounded px-3 bg-blackA2 text-white placeholder:text-[16px] placeholder:text-[#6F6D78] border border-[#3C393F] outline-none"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-baseline justify-between h-fit">
                <label htmlFor="endRelease" className="text-[12.8px] font-medium text-white min-w-fit mr-1.5">
                  Data final
                </label>
              </div>
              <input
                id="endRelease"
                name="endRelease"
                type="date"
                onChange={(e) => setEndRelease(new Date(e.target.value))}
                className="w-full focus:border-[#8E4EC6] h-11 rounded px-3 bg-blackA2 text-white placeholder:text-[16px] placeholder:text-[#6F6D78] border border-[#3C393F] outline-none"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-baseline justify-between h-fit">
                <label htmlFor="ageRating" className="text-[12.8px] font-medium text-white min-w-fit mr-1.5">
                  Classificação etária
                </label>
              </div>
              <input
                id="ageRating"
                name="ageRating"
                type="text"
                onChange={(e) => setAgeRating(e.target.value)}
                className="w-full focus:border-[#8E4EC6] h-11 rounded px-3 bg-blackA2 text-white placeholder:text-[16px] placeholder:text-[#6F6D78] border border-[#3C393F] outline-none"
                placeholder="Classificação etária"
              />
            </div>

            <div className="flex items-center justify-end w-full h-11 gap-4">
              <Dialog.Close asChild>
                <button
                  onClick={() => setShow(!show)}
                  className="w-[98px] h-full hover:bg-[#C150FF2E] bg-[#B744F714] focus:bg-[#B412F90A] cursor-pointer text-white rounded"
                  aria-label="Close"
                >
                  Cancelar
                </button>
              </Dialog.Close>
              <Form.Submit asChild>
                <button
                  type="submit"
                  onClick={() => setShow(true)}
                  className="w-[139px] h-full bg-[#8E4EC6] hover:bg-[#9A5CD0] focus:bg-[#8457AA] cursor-pointer text-white rounded"
                >
                  Aplicar Filtros
                </button>
              </Form.Submit>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
