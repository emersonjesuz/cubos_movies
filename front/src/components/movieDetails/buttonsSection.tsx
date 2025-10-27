import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { handlerErrorApi } from "../../utils/handlerErrorApi";
import { useMovieStore } from "../../zustand/moviesStore";
import HandlerMovieModal from "../modais/handlerMovieModal";

export default function ButtonsSection() {
  const { movie } = useMovieStore();
  const router = useNavigate();

  async function deleteMovie() {
    try {
      confirm("Deseja excluir o filme " + movie.title);
      await api.delete("/movie/" + movie.id);
      router("/");
    } catch (error) {
      const message = handlerErrorApi(error);
      alert(message);
    }
  }

  return (
    <div className="flex items-center w-fit h-11 gap-2 lg:gap-2.5 mx-auto">
      <button
        onClick={() => deleteMovie()}
        className="flex items-center justify-center font-roboto lg:w-[91px] cursor-pointer  w-[85px] h-full rounded-xs bg- hover:bg-[#C150FF2E] bg-[#B744F714] focus:bg-[#B412F90A] text-[#F1DDFFFA] text-[16px]"
      >
        Delete
      </button>
      <HandlerMovieModal type="UPDATE" id={movie.id}>
        <button className="flex items-center justify-center lg:w-[82px] cursor-pointer w-[283px] h-full rounded-xs bg-[#8E4EC6] hover:bg-[#9A5CD0] focus:bg-[#8457AA] font-roboto text-[#F1DDFFFA] text-[16px]">
          Editar
        </button>
      </HandlerMovieModal>
    </div>
  );
}
