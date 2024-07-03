import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchNews } from "../store/apiSlice";
import { SlClose } from "react-icons/sl";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchNews(query));
  };

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <div className="relative flex justify-start items-center w-full md:w-auto">
      <form onSubmit={handleSubmit} className="flex justify-start w-full">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search"
            className="py-1 px-2 rounded-lg border-[1px] w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 px-2 text-gray-500"
            >
              <SlClose />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="py-1 px-2 bg-blue-300 text-black rounded-r-lg"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
