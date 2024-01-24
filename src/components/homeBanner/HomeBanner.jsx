import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../lazyloadImg/Img'
import Wrapper from '../wrapper/Wrapper';
import '../homeBanner/style.scss'
const HomeBanner = () => {
  const [background, setBackground] = useState("")
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming")

  useEffect(() => {
    const bg = url.backdrop +
      data?.results[Math.floor(Math.random() * 20)]?.backdrop_path
    setBackground(bg)
  }, [data])
  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }
  return (
    <div className='heroBanner'>
      {!loading && <div className='backdrop-img'>
        <Img alt='server error img not available' src={background} />
      </div>}

      <div className='opacity-layer'>

      </div>
      <Wrapper>
          <div className='heroBannerContent'>
            <span className='title'>StreamX</span>
            <span className='subTitle'>No time To Die , latest Movies & TV shows here for you go explore and enjoy yourself.</span>
            <div className='searchInput'>
              <input
                type='text'
                placeholder='Search for a movie & tv show...'
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <button onClick={()=>navigate(`/search/${query}`)}>Search</button>
            </div>
          </div>
    
      </Wrapper>

    </div>
  )
}

export default HomeBanner
