import React from "react";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import {AiOutlineArrowLeft} from "react-icons/ai";

const watch = () =>{

    const router = useRouter();
    const {movieId} = router.query;

    const { data } = useMovie(movieId as string);

    return(
        <div className="h-screen w-screen bg-black">
            <nav
                className="
                    fixed
                    full-width
                    p-4
                    z-10
                    flex
                    flex-row
                    items-center
                    gap-8
                    bg-black
                    bg-opacity-70
                "
            >
                <AiOutlineArrowLeft onClick={() => router.push('/')} className="text-white cursor-pointer" size={30}/>
                <p className="text-white text-1xl md:text-3xl flex flex-row font-semibold">
                    <span className="font-light">
                        Now Playing: 
                    </span>
                    {data?.title}
                </p>
            </nav>
            <video autoPlay controls className="h-full w-full" src={data?.videoUrl}></video>
        </div>
    )
}

export default watch;

