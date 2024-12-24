import { request } from "@/api";
import React, { memo, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";
import Genre from "../../components/genre/Genre";
import Movies from "../../components/movies/Movies";
import Loading from "../Loading/Loading";

const Latest = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movieData, setMovieData] = useState(null);
  const [genres, setGenres] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [page, setPage] = useState(+searchParams.get("page") || 1);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (event, value) => {
    setPage(value);
    const params = new URLSearchParams(searchParams);
    params.set("page", value);
    if (selectedGenre.length) {
      params.set("genres", selectedGenre.join("-"));
    }
    setSearchParams(params);
  };

  useEffect(() => {
    request.get("/genre/movie/list").then((res) => setGenres(res.data.genres));
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({ page });
        if (selectedGenre.length) {
          params.set("with_genres", selectedGenre.join(","));
        }
        const response = await request.get(
          `/discover/movie?${params.toString()}`
        );
        setMovieData(response.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
    window.scrollTo(0, 0);
  }, [page, selectedGenre]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="dark:bg-[#000000] dark:text-white">
      <Genre
        setPage={setPage}
        selectedGenre={selectedGenre}
        data={genres}
        setSelectedGenre={setSelectedGenre}
      />
      <Movies data={movieData} />
      <div className="flex justify-center    py-6">
        <Pagination
          className=" text-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
          page={page}
          onChange={handleChange}
          count={
            movieData?.total_pages
              ? movieData.total_pages <= 500
                ? movieData.total_pages
                : 500
              : 1
          }
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
              backgroundColor: "red",
              borderRadius: "50%", 
              "&:hover": {
                backgroundColor: "#ff4d4d",

              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default memo(Latest);
