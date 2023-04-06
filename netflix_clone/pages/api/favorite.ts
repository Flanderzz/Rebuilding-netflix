import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverauth";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {
        if(req.method == 'POST'){

            const { currentUser } = await serverAuth(req);

            const { movieId } = req.body;

            const movieExist = await prismadb.movie.findUnique({where:{id: movieId,}});

            if(!movieExist){
                throw new Error('Invalid ID');
            }

            const user = await prismadb.user.update({
                where: {email: currentUser.email || '',},
                data:{favoriteIds: {push:movieId,}}
            });

            return res.status(200).json(user);
        }

       if(req.method == 'DELETE'){
        const { currentUser } = await serverAuth(req);

        const { movieId } = req.body;

        const movieExist = await prismadb.movie.findUnique({where:{id: movieId,}});

        if(!movieExist){

            throw new Error('Invalid ID');
        }

        const updatedFavoriteMovieIds = without(currentUser.favoriteIds, movieId);

        const updatedUser = await prismadb.user.update({
            where: {email: currentUser.email || '',},
            data:{favoriteIds: updatedFavoriteMovieIds,}
        });

        return res.status(200).json(updatedUser);

       }
        res.status(405).end();
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
    
}