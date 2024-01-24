import React,{useState} from 'react'
import Wrapper from '../wrapper/Wrapper'
import '../trending/trend.scss'
import Tabs from '../tabs/Tabs'
import useFetch from '../../hooks/useFetch'
import Carousel from '../carousel/Carousel'
const TopRated = () => {
    const[endpoint,setEndpoint] =useState("movie")
    const {data,loading} = useFetch(`/${endpoint}/top_rated`);

    const onTabChange = (tab) =>{
        setEndpoint(tab === "Movies" ? "movie" : "tv")
    }
  return (
    <div className='carouselSection'>
        <Wrapper>
            <span className="carouselTitle">Top Rated Movies & Shows</span>
            <Tabs data={["Movies","Web Series"]} onTabChange={onTabChange} />
        </Wrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  )
}

export default TopRated
