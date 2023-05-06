import axios from "axios";
import { useCallback, useMemo } from "react";
import { useCurrentUser, useFavorites } from "@/hooks";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { User } from "@prisma/client";

interface IFavoriteButtonProsps {
  movieId: string;
}

const FavoriteButton: React.FC<IFavoriteButtonProsps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds ?? [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorite = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.post<User>("/api/favorite", {
        method: "DELETE",
        movieId,
      });
    } else {
      response = await axios.post<User>("/api/favorite", {
        method: "POST",
        movieId,
      });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    if (currentUser)
      mutate({ ...currentUser, favoriteIds: updatedFavoriteIds });

    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  return (
    <div
      onClick={toggleFavorite}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex items-center justify-center transition hover:border-neutral-300"
    >
      {!isFavorite ? (
        <AiOutlinePlus className="text-white" size={25} />
      ) : (
        <AiOutlineCheck className="text-white" size={25} />
      )}
    </div>
  );
};

export default FavoriteButton;
