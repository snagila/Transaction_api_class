import React from "react";
import Home from "./Component/Home";
import { Route, Routes } from "react-router-dom";
import MoviePage from "./Component/moviePage/MoviePage";
import ScrollToTop from "./Component/ScrollToTop";
import Search from "./Component/moviePage/Search";
// import { Navbar } from "react-bootstrap";
import Navbar from "./Component/Navbar";

function App() {
  return (
    <>
    <ScrollToTop/>
    {/* <Navbar/> */}
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moviePage/:id" element={<MoviePage />} />
        <Route path='/search/:id' element={<Search/>}/>
      </Routes>
    </>
  );
}

export default App;
