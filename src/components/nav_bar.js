import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar(){
  return (
    <nav className='navbar navbar-inverse'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <Link to="/" className='navbar-brand'>ShowsTracker</Link>
        </div>
        <ul className="nav navbar-nav">
          <li><Link to="/shows">Watchlist</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/">Search</Link></li>
        </ul>
      </div>
    </nav>
  )
}
