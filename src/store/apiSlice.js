import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;
const cache = {};

// Function to fetch data from the cache
const fetchFromCache = (url) => {
  const cached = cache[url];
  if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
    // Cache expiry time: 5 minutes
    return cached.data;
  }
  return null;
};

// Function to store data in the cache
const storeInCache = (url, data) => {
  cache[url] = { data, timestamp: Date.now() };
};

// Helper function to implement exponential backoff
const fetchWithExponentialBackoff = async (
  url,
  retries = 5,
  initialDelay = 3000
) => {
  let delay = initialDelay;
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (
        i === retries - 1 ||
        !error.response ||
        error.response.status !== 429
      ) {
        throw error;
      }
      // Use a self-invoking function to create a new scope for each iteration
      await (function (delay) {
        return new Promise((resolve) => setTimeout(resolve, delay));
      })(delay);
      delay *= 2; // Increase the delay for the next retry
    }
  }
};

export const fetchNews = createAsyncThunk("api/fetchNews", async (query) => {
  const url = query
    ? `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${REACT_APP_API_KEY}`
    : `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${REACT_APP_API_KEY}`;

  // Check if the response is in the cache
  const cachedData = fetchFromCache(url);
  if (cachedData) {
    return cachedData;
  }

  // If not in cache, make the API call with exponential backoff
  const data = await fetchWithExponentialBackoff(url);
  const results = query ? data.response.docs : data.results;

  // Store the response in the cache
  storeInCache(url, results);
  return results;
});

const initialState = {
  news: [],
  status: "idle",
  error: null,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectNews = (state) => state.api.news;
export const selectStatus = (state) => state.api.status;
export const selectError = (state) => state.api.error;

export default apiSlice.reducer;
