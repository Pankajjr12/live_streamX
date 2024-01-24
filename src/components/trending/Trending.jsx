import React,{useState} from 'react'
import Wrapper from '../wrapper/Wrapper'
import '../trending/trend.scss'
import Tabs from '../tabs/Tabs'
import useFetch from '../../hooks/useFetch'
import Carousel from '../carousel/Carousel'



const Trending = () => {
    const[endpoint,setEndpoint] =useState("day")
    const {data,loading} = useFetch(`/trending/all/${endpoint}`);

    const onTabChange = (tab) =>{
        setEndpoint(tab === "Day" ? "day" : "week")
        
    }
  return (
    <div className='carouselSection'>
        <Wrapper>
            <span className="carouselTitle">Latest Movies & Shows</span>
            <Tabs data={["Day","Week"]} onTabChange={onTabChange} />
        </Wrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  )
}

export default Trending
