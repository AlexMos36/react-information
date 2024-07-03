import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchNews,
  selectNews,
  selectStatus,
  selectError,
} from "../store/apiSlice";
import LoadingSpinner from "./LoadingSpinner";

const Category = () => {
  //useParams hook to get the category name from the URL
  const { categoryName } = useParams();
  //useDispatch hook to get dispatch function
  const dispatch = useDispatch();
  //useSelector hook to get the news, status, error from the Redux store
  const news = useSelector(selectNews);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    if (categoryName) {
      dispatch(fetchNews(categoryName));
    }
  }, [dispatch, categoryName]);
  //Show the loading spinner if the status is "loading"
  if (status === "loading") {
    return <LoadingSpinner />;
  }
  //Show an error message if the status is failed
  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  //Render the list of news articles
  return (
    <div>
      {news.map((article) => (
        <article
          key={article.url || article._id}
          className="border-b border-gray-400 pt-4 p-4 mt-2 mb-2"
        >
          <div className="flex justify-center p-4">
            <div className="w-[560px]">
              <h2 className="font-bold text-xl">
                {article.title || article.headline.main}
              </h2>
              <p className="text-l">
                {article.abstract || article.lead_paragraph}
              </p>
              <h6 className="p-2">
                {article.updated_date || article.pub_date}
              </h6>
              {article.multimedia &&
                Array.isArray(article.multimedia) &&
                article.multimedia.length > 0 && (
                  <img
                    src={`https://www.nytimes.com/${
                      article.multimedia[0].url ||
                      article.multimedia[0].legacy.xlarge
                    }`}
                    alt={article.multimedia[0].caption || "Article image"}
                    className="w-[560px]"
                  />
                )}
              <div className="flex justify-between items-center p-1">
                <a
                  href={article.url || article.web_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline"
                >
                  Web Resource
                </a>
                <h6 className="text-grey-600">{article.byline?.original}</h6>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Category;
