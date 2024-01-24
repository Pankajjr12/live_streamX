import React from 'react'


import HomeBanner from '../../components/homeBanner/HomeBanner'
import Trending from '../../components/trending/Trending'
import Popular from '../../components/popular/Popular'
import TopRated from '../../components/topRated/TopRated'

import Upcoming from '../../components/upcoming/Upcoming'


const home = () => {
  return (
    <div className='homePage'>
      <HomeBanner />
      <Trending />
    
      <Popular />
    
      <TopRated />
      

      
    </div>
  )
}

export default home
