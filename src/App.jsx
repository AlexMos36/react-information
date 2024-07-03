import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./header/Home";
import Category from "./components/Category";
import NewsDetail from "./components/NewsDetails";
import Footer from "./components/Footer";
import CategoryButtons from "./components/CategoryButtons";

function App() {
  return (
    <Router>
      <div>
        <CategoryButtons />
        <div className="bg-gray-100 text-black p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/news/:newsId" element={<NewsDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
