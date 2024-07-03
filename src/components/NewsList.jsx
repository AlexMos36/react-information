import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNews,
  selectNews,
  selectStatus,
  selectError,
} from "../store/apiSlice";
import LoadingSpinner from "./LoadingSpinner";

const NewsList = () => {
  //Redux dispatch function to dispatch actions
  const dispatch = useDispatch();
  //Selectors to get news, status and error from the Redux store
  const news = useSelector(selectNews);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  //State to manage the number of visible articles
  const [visibleArticles, setVisibleArticles] = useState(5);

  //useEffect hook to fetch news whend the component mount
  useEffect(() => {
    dispatch(fetchNews("home"));
  }, [dispatch]);

  //Function to handle loading more articles
  const handleLoadMore = () => {
    setVisibleArticles(visibleArticles + 2);
  };

  //If the status is "loading" render the LoadingSpinner component
  if (status === "loading") {
    return <LoadingSpinner />;
  }

  //If the status is failed , render the error message
  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  //Render the list of news articles
  return (
    <div>
      {news.slice(0, visibleArticles).map((article) => (
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
      {visibleArticles < news.length && (
        <div className="flex justify-center p-4">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsList;
