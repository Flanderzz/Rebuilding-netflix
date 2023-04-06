import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Navbar from "@/components/navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovIeList";
import useFavorites from "@/hooks/useFavorites";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if(!session){

    return{
      redirect: {
        destination: '/auth',
        permanent: false,

      } 
    }
  }
  return{
    props:{}
  }
}

export default function Home() {
  const { data:movie = [] } = useMovieList();
  const { data:favories = [] } = useFavorites();

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Now Trending" data={movie} />
        <MovieList title="My Favorites" data={favories} />
      </div>
    </>
  )
}
