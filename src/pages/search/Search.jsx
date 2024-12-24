import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { ReactTyped } from "react-typed";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "@/api";
import Movies from "../../components/movies/Movies";
import { useSearchParams } from "react-router-dom";
import { GoXCircle } from "react-icons/go";

const Search = () => {
  const [searchParam, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParam.get("q") || "");
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["movie"],
    queryFn: () =>
      request
        .get("/search/movie", {
          params: {
            query: searchValue,
          },
        })
        .then((res) => res.data),
  });

  const handleClear = () => {
    setSearchValue("");
    setSearchParams({});
  };

  const handleSearch = (e) => {
    e.preventDefault();
    queryClient.invalidateQueries({ queryKey: ["movie"] });
    if (searchValue) {
      setSearchParams({ q: searchValue });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="bg-[#111111]">
      <div className="container dark:bg-[#111111] dark:text-white text-black mx-auto py-8">
        <form
          onSubmit={handleSearch}
          className="max-w-[800px] mx-auto flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm"
        >
          <ReactTyped
            strings={["Avengers", "Venom", "Avatar", "Spiderman"]}
            typeSpeed={40}
            backSpeed={50}
            attr="placeholder"
            loop
            className="flex-1"
          >
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="h-12 w-full px-4 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
            />
          </ReactTyped>
          {searchValue.length ? (
            <button
              onClick={handleClear}
              className="w-12 h-12 flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              <GoXCircle />
            </button>
          ) : null}
          <button
            type="submit"
            className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            <CiSearch size={24} />
          </button>
        </form>

        <div className="py-6">
          {data?.total_results === 0 && (
            <p className="text-center text-white">Movie not found</p>
          )}
        </div>

        <Movies
          className="dark:bg-[#111111] dark:text-white text-black"
          data={data}
        />
      </div>
    </div>
  );
};

export default Search;
