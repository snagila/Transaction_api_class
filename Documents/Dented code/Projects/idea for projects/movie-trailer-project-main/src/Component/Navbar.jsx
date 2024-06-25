import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
function Navbar() {
  return (
    <div className='nav w-100  '>
        <div className='container d-flex  justify-content-between'>
        <Link to='/'>
        <h2 className='text-warning'>Movie</h2>
       </Link>
       {/* <p>Search</p> */}
        </div>
       
        
    </div>
  )
}

export default Navbar