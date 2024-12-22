import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { request } from "@/api";
import Loading from "@/pages/Loading/Loading";

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await request.get(`/movie/${id}`);
        setMovie(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center text-2xl min-h-10 text-red-600">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Xato yuz berdi: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-[#000000] text-white min-h-screen p-4">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="mb-4">{movie.overview}</p>
          <p>
            <strong>Janr:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Chiqarilgan sana:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Reyting:</strong> {movie.vote_average} / 10
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
