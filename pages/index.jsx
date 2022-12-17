import React from 'react'

// Import Components
import Header from '../components/Header'
import Trending from '../components/Trending'
import LatestMovies from '../components/LatestMovies'
import LatestTV from '../components/LatestTV'

function Home() {
  return (
    <div className='min-h-screen bg-[#282C37]'>
      <Header />
      <Trending />
      <LatestMovies />
      <LatestTV />
    </div>
  )
}

export default Home