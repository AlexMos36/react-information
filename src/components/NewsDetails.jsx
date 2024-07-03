import React from "react";
import { useParams } from "react-router-dom";

const NewsDetail = () => {
  const { newsId } = useParams();

  // You can use newsId to fetch and display detailed news article
  return (
    <div>
      <h1>News Detail for ID: {newsId}</h1>
      {/* Render the news detail based on the newsId */}
    </div>
  );
};

export default NewsDetail;
