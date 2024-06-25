// import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
// import Swiper from 'swiper';
// import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../App.css";
import { Autoplay } from "swiper/modules";
import Moviecard from "./Moviecard";
import { Link } from "react-router-dom";
// import Moviecard from "./Component/Moviecard";

function SwiperComponent({movie}) {
  const breakpoints = {
    // when window width is >= 0px
    0: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    574:{
      slidesPerView: 3,
      spaceBetween: 20,

    },

    // when window width is >= 768px
    768: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    // when window width is >= 992px
    992: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1200:{
      slidesPerView: 6,
      spaceBetween: 20,

    }
  };

  return (
    <>
      <Swiper
        loop:true="true"
        autoplay={{
          delay: 3000, // Delay between transitions in milliseconds
          disableOnInteraction: false, // Allow manual navigation while autoplay is active
        }}
        modules={[Autoplay]}
        className="mySwiper"
        breakpoints={breakpoints}
      >
        {
          movie.map(flim=>{
            return <SwiperSlide key={flim.id} className="border-0">
            <Moviecard flim={flim} />
          </SwiperSlide>
          })
        }
        
      </Swiper>
    </>
  );
}

export default SwiperComponent;
