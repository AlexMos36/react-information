import React from "react";

const Dates = () => {
  const current = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = days[current.getDay()];
  const month = months[current.getMonth()];
  const year = current.getFullYear();
  const day = current.getDate();
  return (
    <div>
      <span className="font-bold text-xs ">
        {dayOfWeek}, {month} {day}, {year}
      </span>
    </div>
  );
};

export default Dates;
