import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Moviecard from "../Moviecard";
import "./Search.css";

function Search() {
  const { id } = useParams();
  const api_key = "6b1a6c73e4ee90d6decf504ae4440ba4";
  const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${id}`;
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovie = async () => {
    setIsLoading(true);
    const response = await fetch(searchMovieUrl);
    const data = await response.json();
    setMovieList(data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  return (
    <>
      <h4 className="py-5">Search results for '{id}'</h4>

      {!isLoading &&
        (movieList.length > 0 ? (
          <div className="movielist">
            {movieList.map((movie) => {
              return <Moviecard key={movie.id} flim={movie} />;
            })}
          </div>
        ) : (
          <h1>No result Found</h1>
        ))}
    </>
  );
}

export default Search;
