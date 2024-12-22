import React, { memo } from "react";
import MoviesItem from "./MoviesItem";

const Movies = ({ data,bg }) => {
  return (
    <div className="dark:bg-black container py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data?.results?.map((movie) => (
        <MoviesItem key={movie?.id} {...movie} bg={bg} />
      ))}
    </div>
  );
};

export default memo(Movies);
