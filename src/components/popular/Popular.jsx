import React,{useState} from 'react'
import Wrapper from '../wrapper/Wrapper'
import '../trending/trend.scss'
import Tabs from '../tabs/Tabs'
import useFetch from '../../hooks/useFetch'
import Carousel from '../carousel/Carousel'


const Popular = () => {
    const[endpoint,setEndpoint] =useState("movie")
    const {data,loading} = useFetch(`/${endpoint}/popular`);
    const [title,setTitle] =useState("Popular Movies")
    const onTabChange = (tab) =>{
        setEndpoint(tab === "Movies" ? "movie" : "tv")
        if(tab === "Web Series"){
          setTitle("Popular Shows")
        }
        else{
          setTitle("Popular Movies")
        }
    }
  return (
    <div className='carouselSection'>
        <Wrapper>
            <span className="carouselTitle">{title}</span>
            <Tabs data={["Movies","Web Series"]} onTabChange={onTabChange} />
        </Wrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  )
}

export default Popular
