import React from 'react'
import { Button, Card, NavLink } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Moviecard({flim}) {
 
  return (
    <>
    <Link to={`/moviePage/${flim.id}`}>
    <Card  className='custom-color w-100 text-white'>
      {flim.poster_path ? (  
            <Card.Img style={{  height: '350px' }} variant="top" className='rounded-3' src={`https://image.tmdb.org/t/p/w500/${flim.poster_path}`} alt='' />
):(      <Card.Img style={{  height: '350px' }} variant="top" className='rounded-3' src="https://moviea.vercel.app/assets/no-poster-af8294eb.png" alt='' />
)}
      
      <Card.Body>
        <Card.Title>{flim.title}</Card.Title>
        <Card.Text className='text-secondary'>
          {flim.release_date}
        </Card.Text>
        

      </Card.Body>
    </Card>
    </Link>
    
    
    </>
  )
}

export default Moviecard