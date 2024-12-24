import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Qo'shildi
import "./Genre.css";

const Genre = ({ data, setSelectedGenre, selectedGenre, setPage }) => {
  const [searchParams, setSearchParams] = useSearchParams(); // Qo'shildi

  const handleChange = (id) => {
    setPage(1);
    if (selectedGenre.includes(id)) {
      setSelectedGenre((prev) =>
        prev.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedGenre((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    if (selectedGenre.length) {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      params.set("genres", selectedGenre.join("-"));
      setSearchParams(params); // Xato shuni ishlatib to'g'irlanadi
    } else {
      setSearchParams({});
    }
  }, [selectedGenre, searchParams, setSearchParams]);

  return (
    <div className="genre-container dark:bg-[#000000] dark:text-white">
      {data?.map((item) => (
        <div
          onClick={() => handleChange(item.id)}
          className={`genre-item ${
            selectedGenre.includes(item.id) ? "selected" : ""
          }`}
          key={item.id}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Genre;
