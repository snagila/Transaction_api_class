import React, { useEffect, useState } from "react";
import SwiperComponent from "../SwiperComponent";

function SimilarMovie({ id }) {
  const api_key = "6b1a6c73e4ee90d6decf504ae4440ba4";
  const [similar, setSimilar] = useState([]);
  const similarContentUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${api_key}`;
  const fetchSimilarMovie = async () => {
    const response = await fetch(similarContentUrl);
    const data = await response.json();

    setSimilar(data.results);
    // console.log(data);
  };
  useEffect(() => {
    fetchSimilarMovie();
  }, [id]);

  return (
    <>
      {similar.length>0 && (
        <div>
          <div className="d-flex justify-content-between p-3">
            <h3>Similar</h3>
          </div>
          <SwiperComponent movie={similar} />
        </div>
      ) }
    </>
  );
}

export default SimilarMovie;
