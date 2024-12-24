import React, { memo, useEffect, useState } from "react";
import { request } from "@/api";
import Carausel from "./Carausel";
import Movies from "@/components/movies/Movies";
import Loading from "../Loading/Loading";

const Home = () => {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await request.get("/discover/movie");
        setMovieData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
    window.scrollTo(0, 0);
   
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Xato yuz berdi: {error.message}
      </div>
    );
  }

  return (
    <>
    <div className="bg-black">

      <Carausel movies={movieData?.results} />
      <Movies data={movieData} />
    </div>
    </>
  );
};

export default memo(Home);
