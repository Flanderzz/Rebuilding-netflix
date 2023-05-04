import React from "react";
import { HiPlay } from "react-icons/Hi";
import { useRouter } from "next/router";

interface PlayButtonProps{
    movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({movieId}) =>{

    const router = useRouter();

    return(
        <button
        onClick={()=>router.push(`/watch/${movieId}`)}
        className="
            bg-white
            rounded-md
            py-1 md:py-2
            px-2 md:px-4
            w-auto
            text-xs lg:text-lg
            font-semibold
            flex
            flex-row
            items-center
            hover:bg-neutral-500
            transition
        "
        
        >
        <HiPlay size={23} className="mr-2"/>
          Play
        </button>
    )
    }

    export default PlayButton;
