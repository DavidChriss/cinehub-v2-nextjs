import React from 'react'

// Import Components
import Header from '../components/Header'
import Trending from '../components/Trending'
import LatestMovies from '../components/LatestMovies'
import LatestTV from '../components/LatestTV'

export async function getServerSideProps(context) {
  const [trending, latestMovies, latestTV] = await Promise.all([
    (await fetch('https://cinehub-v2-backend.vercel.app/api/movies/trending')).json(),
    (await fetch('https://cinehub-v2-backend.vercel.app/api/movies/latest')).json(),
    (await fetch('https://cinehub-v2-backend.vercel.app/api/tv/latest')).json()
  ])
  return {
    props: { trendingData: trending, latestMoviesData: latestMovies, latestTVData: latestTV }, // will be passed to the page component as props
  }
}

function Home({ trendingData, latestMoviesData, latestTVData }) {
  return (
    <div className='min-h-screen bg-[#282C37]'>
      <Header />
      <Trending data={trendingData}/>
      <LatestMovies data={latestMoviesData}/>
      <LatestTV data={latestTVData}/>
    </div>
  )
}

export default Home