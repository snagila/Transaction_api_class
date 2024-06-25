import React, { useEffect, useState } from "react";
import SwiperComponent from "../SwiperComponent";

function RecommendedMovie({ id }) {
  const api_key = "6b1a6c73e4ee90d6decf504ae4440ba4";
  const [recomended, setRecomended] = useState([]);
  const recommendedContentUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${api_key}`;

  const fetchRecommendedMovies = async () => {
    const response = await fetch(recommendedContentUrl);
    const data = await response.json();

    setRecomended(data.results);
  };
  useEffect(() => {
    fetchRecommendedMovies();
  }, [id]);

  return (
    <>
      {recomended.length>0 && (
        <div>
          <div className="d-flex justify-content-between p-3">
            <h3>Recommended For You</h3>
          </div>
          <SwiperComponent movie={recomended} />
        </div>
      ) }
    </>
  );
}

export default RecommendedMovie;
