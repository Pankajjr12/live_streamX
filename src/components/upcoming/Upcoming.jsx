import React,{useState} from 'react'
import Wrapper from '../wrapper/Wrapper'
import '../trending/trend.scss'
import Tabs from '../tabs/Tabs'
import useFetch from '../../hooks/useFetch'
import Carousel from '../carousel/Carousel'
const Upcoming = () => {
    const[endpoint,setEndpoint] =useState("upcoming")
    const {data,loading} = useFetch(`/movie/upcoming`);
    const [title,setTitle] = useState("Upcoming") 
    const onTabChange = (tab) =>{
        setEndpoint(tab === "Upcoming" ? "upcoming" : "now_playing")
        
    }
   
  return (
    <div className='carouselSection'>
        <Wrapper>
            <span className="carouselTitle">{title}</span>
            <Tabs data={["Upcoming","Now Playing"]} onTabChange={onTabChange} />
        </Wrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  )
}

export default Upcoming
