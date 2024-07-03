import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import logo from "../assets/TheNewYorkTimes.png";
import Date from "../header/Date";
import SearchForm from "../header/SearchForm";

const categories = [
  "Arts",
  "Automobiles",
  "Food",
  "Politics",
  "Science",
  "Movies",
  "Opinion",
  "Sports",
  "Technology",
  "World",
];

const CategoryButtons = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div>
      {/* Top section with date , logo and search form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 bg-white">
        <div className="flex justify-between md:justify-start md:col-span-1 ">
          {/* Display the current Date */}
          <Date />
          {/* Menu button for mobile view */}
          <div className="flex justify-start md:hidden" onClick={handleNav}>
            {!nav ? (
              <AiOutlineMenu size={30} className="text-black" />
            ) : (
              <AiOutlineClose size={30} className="text-black" />
            )}
          </div>
        </div>
        <div className="flex justify-center md:justify-start md:col-span-1">
          {/* Logo */}
          <img
            src={logo}
            alt="TheNewYorkTimes"
            className="w-64 md:w-[1240px] flex justify-center items-center"
          />
          {/* Date for larger screens */}
          <div className="hidden md:justify-start md:col-span-1">
            <Date />
          </div>
        </div>
        <div className="flex justify-center md:justify-end md:col-span-1 hidden md:flex">
          {/* Search form for larger screen */}
          <SearchForm />
        </div>
      </div>
      {/* Navigation menu for smaller screen */}
      <div
        className={`md:hidden ${
          !nav ? "hidden" : "flex"
        } flex-col items-center mt-4 mb-3`}
      >
        <SearchForm />
        {/* Category links */}
        {categories.map((category) => (
          <Link
            key={category}
            to={`/category/${category.toLowerCase()}`}
            className="p-2 text-black"
            onClick={() => setNav(false)}
          >
            {category}
          </Link>
        ))}
      </div>
      {/* Navigation menu for larger screens  */}
      <div className="hidden md:flex justify-center items-center mt-4">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/category/${category.toLowerCase()}`}
            className="p-2 text-black"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryButtons;
