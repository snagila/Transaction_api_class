import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SwiperComponent from "../SwiperComponent";
import RecommendedMovie from "./RecommendedMovie";
import "./MoviePage.css";
import SimilarMovie from "./SimilarMovie";
import play from "./play.png";

function MoviePage() {
  const { id } = useParams();
  const api_key = "6b1a6c73e4ee90d6decf504ae4440ba4";
  const [movieDetail, setMovieDetail] = useState({});
  const [video_key, setVideo_key] = useState("");

  const searchMovieurl = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`;
  // const searchTvUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}`
  const movieVideoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}`;
  const [showTrailer, setShowTrailer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchmedia = async () => {
    setIsLoading(true);
    const response = await fetch(searchMovieurl);
    const data = await response.json();

    setMovieDetail(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchmedia();
  }, [id]);

  const fetchVideo = async () => {
    try {
      const response = await fetch(movieVideoUrl);
      const data = await response.json();

      if (response.status === 200) {
        // Check if there are results and if the first result has a 'key' property
        if (data.results && data.results[0] && data.results[0].key) {
          setVideo_key(
            data.results.filter((video) => video.type === "Trailer")[0].key
          );
        } else {
          console.log("Video key not found in the API response");
        }
      } else {
        console.log("Error fetching video data:", data);
      }
    } catch (error) {
      console.log("Error fetching video:", error);
    }
  };
  useEffect(() => {
    fetchVideo();
  }, [id]);

  return (
    <div className="container-lg h">
      {!isLoading && (
        <div className="d-flex gap-5 mt-5 customize ">
          <div className="poster">
            {movieDetail.poster_path ? (
              <img
                className="rounded-3 poster-image"
                src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
                alt=""
              />
            ) : (
              <img
                variant="top"
                className="rounded-3"
                src="https://moviea.vercel.app/assets/no-poster-af8294eb.png"
                alt=""
              />
            )}
          </div>

          <div className=" d-flex flex-column gap-2 poster-des p-2">
            <div>
              <h2>
                {movieDetail.title}({movieDetail?.release_date?.slice(0, 4)})
              </h2>
              <span className="text-secondary">{movieDetail.tagline} </span>
            </div>
            <div className="d-flex gap-3">
              {movieDetail.genres?.map((genre) => {
                return (
                  <p key={genre.id} className=" p-1 bg-danger">
                    {genre.name}
                  </p>
                );
              })}
            </div>
            <div>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowTrailer(true);
                }}
              >
                Watch trailer
              </Button>
            </div>
            {showTrailer && (
              <>
                <div className="trailervideo w-100 backdrop-blur">
                  <div className="text-end">
                    <Button
                      variant="btn-link text-white"
                      onClick={() => {
                        setShowTrailer(false);
                      }}
                    >
                      close
                    </Button>
                  </div>
                  {
                    video_key ? (
                      <iframe
                      width="100%"
                      height="500"
                      src={`https://www.youtube.com/embed/${video_key}?autoplay=1&mute=0`}
                      frameBorder="0"
                      allowFullScreen
                      allow="accelerometer; autoplay;"
                    ></iframe>
                    ):(
                      <h1 className="text-center error-message">sorry this movie video is not available right now</h1>
                    )
                  }
                  {/* <iframe
                    width="100%"
                    height="500"
                    src={`https://www.youtube.com/embed/${video_key}?autoplay=1&mute=0`}
                    frameBorder="0"
                    allowFullScreen
                    allow="accelerometer; autoplay;"
                  ></iframe> */}
                </div>
              </>
            )}
            <h3>Overview</h3>
            <p>{movieDetail.overview}</p>
            <div className="d-flex gap-3 customize">
              <p>
                Status:
                <span className="text-secondary"> {movieDetail.status}</span>
              </p>
              <p>
                Released Date:{" "}
                <span className="text-secondary">
                  {movieDetail.release_date}
                </span>
              </p>
              <p>
                {" "}
                Runtime:{" "}
                <span className="text-secondary">
                  {(movieDetail.runtime / 60).toFixed(0)}hour{" "}
                  {movieDetail.runtime % 60}min{" "}
                </span>
              </p>
            </div>
            <hr />
          </div>
        </div>
      )}

      <SimilarMovie id={id} />

      <RecommendedMovie id={id} />
      {showTrailer && <div className="backdrop"></div>}
    </div>
  );
}

export default MoviePage;
