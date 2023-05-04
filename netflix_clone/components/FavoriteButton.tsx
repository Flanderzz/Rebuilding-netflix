import axios from "axios";
import React, { useCallback, useMemo } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { GoThumbsup, GoThumbsdown } from "react-icons/Go";

interface FavoriteButtonProps{

    movieId: string;
}

const FavoriteButton:React.FC<FavoriteButtonProps> = ({movieId}) => {

    const { mutate: mutateFavories } = useFavorites();
    const{ data:currentUser, mutate } = useCurrentUser();

    const checkFavorites = useMemo(() => {
        const listFavorites = currentUser?.favoriteIds || [];

        return listFavorites.includes(movieId);


    }, [currentUser, movieId]);

    const switchForFavorites = useCallback(async () => {
        let response;

        if(checkFavorites){

            response = await axios .delete('/api/favorite', {data:{movieId}});
        } else {
            response = await axios .post('/api/favorite', {movieId});
        }

        const updatedFavoriteIds= response?.data?.favoriteIds;

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds
        });

        mutateFavories();


    },[movieId, checkFavorites, currentUser, mutate, mutateFavories]);

    const SwitchIcon = checkFavorites ? GoThumbsdown  : GoThumbsup;

    return(
        <div onClick={switchForFavorites} className="
            cursor-pointer 
            w-6 
            h-6 
            lg:w-10 
            lg:h-10 
            border-white
            border-4 
            rounded-full 
            flex 
            justify-center 
            items-center 
            transition 
            hover:bg-neutral-100
        ">
            <SwitchIcon className="text-white" size={20} />
        </div>
    )
}

export default FavoriteButton;