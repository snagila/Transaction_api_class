
// import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import Swiper from 'swiper';
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components

import '../App.css';
import SwiperComponent from './SwiperComponent';
import { Button, ButtonGroup } from 'react-bootstrap';
import SearchForm from './SearchForm';


function Home() {
  const [mediaName, setMediaName] = useState('')
  const [media_id, setMedia_id] = useState(0)
  const [time_window, setTime_window] = useState("day")
  const [movie, setMovie] = useState([])
  const [popular, setPopular] = useState([])
  const [choice, setChoice] = useState("movie")
  const [topRated_choice, setTopRated_choice] = useState("movie")
  const [cinema, setCinema] = useState([])
  const [topRated, settopRated] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const api_key ="6b1a6c73e4ee90d6decf504ae4440ba4"
  const searchMediaurl =`https://api.themoviedb.org/3/search/multi?api_key=${api_key}&query=${mediaName}`
  const recommendedContentUrl = `https://api.themoviedb.org/3/movie/${media_id}/recommendations?api_key=${api_key}`
  const similarContentUrl = `https://api.themoviedb.org/3/movie/${media_id}/similar?api_key=${api_key}`
  const trendindMovieUrl = `https://api.themoviedb.org/3/trending/movie/${time_window}?api_key=${api_key}`
  const popularUrl = `https://api.themoviedb.org/3/${choice}/popular?api_key=${api_key}`
  const cinemaUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`
  const topRatedUrl = `https://api.themoviedb.org/3/${topRated_choice}/top_rated?api_key=${api_key}`
  const upcomingUrl =`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}`



  const fetchTrending= async()=>{
    const response = await fetch(trendindMovieUrl)
    // console.log(response)
    const data = await response.json()
    // console.log(data.results)
    setMovie(data.results)

  }
  const fetchPopular= async()=>{
    const response = await fetch(popularUrl)
    // console.log(response)
    const data = await response.json()
    // console.log(data.results)
    setPopular(data.results)

  }
  const fetchCinema= async()=>{
    const response = await fetch(cinemaUrl)
    // console.log(response)
    const data = await response.json()
    // console.log(data.results)
    setCinema(data.results)

  }
  const fetchTopRated= async()=>{
    const response = await fetch(topRatedUrl)
    // console.log(response)
    const data = await response.json()
    // console.log(data.results)
    settopRated(data.results)

  }
  const fetchUpcoming= async()=>{
    const response = await fetch(upcomingUrl)
    // console.log(response)
    const data = await response.json()
    console.log(data.results)
    setUpcoming(data.results)

  }
  useEffect(()=>{
    fetchUpcoming()
  },[])

  useEffect(()=>{
    fetchTopRated()
  },[topRated_choice])
  
  useEffect(()=>{
    fetchTrending()
  },[time_window])
  useEffect(()=>{
    fetchPopular()
  },[choice])
  useEffect(()=>{
    fetchCinema()
  },[])
 

  return (
    <>
    <SearchForm/>
      <div className='d-flex justify-content-between p-3'>
     <h3>Trending</h3>
     
     <ButtonGroup aria-label="Basic example" >
      <Button variant=" px-4 a" onClick={()=>{
        setTime_window("day")
        document.querySelector('.a').style.background ="orange"
        document.querySelector('.b').style.background ="white"
      }}>Day</Button>
      <Button variant=" px-4 b" onClick={()=>{
        setTime_window("week")
        document.querySelector('.b').style.background ="orange"
        document.querySelector('.a').style.background ="white"
      }}>Week</Button>
      
    </ButtonGroup>
    </div>
     <SwiperComponent movie = {movie}/>
     <div className='d-flex justify-content-between p-3'>
     <h3>What's Popular</h3>
     
     {/* <ButtonGroup aria-label="Basic example" >
      <Button variant="warning px-4" onClick={()=>{
        setChoice("movie")
      }}>Movie</Button>
      <Button variant="info px-4" onClick={()=>{
        setChoice("tv")
      }}>TV Shows</Button>
      
    </ButtonGroup> */}
    </div>
     <SwiperComponent movie = {popular}/>
     <div className='d-flex justify-content-between p-3'>
     <h3>Top Rated</h3>
     
     {/* <ButtonGroup aria-label="Basic example" >
      <Button variant="warning px-4" onClick={()=>{
        setTopRated_choice("movie")
      }}>Movie</Button>
      <Button variant="info px-4" onClick={()=>{
        setTopRated_choice("tv")
        console.log(topRated)
      }}>TV Shows</Button>
      
    </ButtonGroup> */}
    </div>
     <SwiperComponent movie = {topRated}/>

     <div className='d-flex justify-content-between p-3'>
     <h3>Now in Cinema</h3>
     
    
    </div>
     <SwiperComponent movie = {cinema}/>
     <div className='d-flex justify-content-between p-3'>
     <h3>Upcoming</h3>
     
    
    </div>
     <SwiperComponent movie = {upcoming}/>
     
    
    </>
  )
}

export default Home
