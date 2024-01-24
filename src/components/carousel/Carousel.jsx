import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import Img from '../lazyloadImg/Img'

import PosterFallback from "../../assets/no-poster.png";
import '../carousel/carousel.scss'
import Wrapper from "../wrapper/Wrapper";
import RatingCircle from "../circleRating/RatingCircle";
import Genres from "../genres/Genres";
import Star from '../../assets/ratingStar.png'
const Carousel = ({data,loading,endpoint,title}) => {
  const carouselContainer = useRef()
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate()
  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
        dir === "left"
            ? container.scrollLeft - (container.offsetWidth + 20)
            : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
    });
};


  const skItem = () =>{
    <div className="skeletonItem">
      <div className="posterBlock skelton"></div>
      <div className="textBlock">
        <div className="title skelton"></div>
        <div className="date skelton"></div>
      </div>
    </div>
  }
  return (
    <div className="carousel">
      <Wrapper>
        {title && <div className="carouselTitle">{title}
        </div>}
        <BsFillArrowLeftCircleFill 
        className="carouselLeftNav arrow"
        onClick={()=>navigation("left")}>
        </BsFillArrowLeftCircleFill>

        <BsFillArrowRightCircleFill 
        className="carouselRighttNav arrow"
        onClick={()=>navigation("right")}>
        </BsFillArrowRightCircleFill>

        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
          {
            data?.map((item) =>{
              const posterUrl = item.poster_path? 
              url.poster + item.poster_path : PosterFallback;
              return(
                <div key={item.id} className="carouselItem" 
                onClick={()=> navigate(`/${item?.media_type|| endpoint}/${item?.id}`)}>
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <RatingCircle  rating={item?.vote_average.toFixed(1)} />
                    <Genres data={item?.genre_ids.slice(0,2)}/>
                  </div>
                  <div className="textBlock">
                    <span className="title">
                      {
                        item.title || item.name
                      }
                    </span>
                    <span className="date">{
                      dayjs(item.release_Date).format("MMM D, YYYY")
                    }</span>
                    </div>
                </div>
              )
            })
          }
          </div>
        ):(
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )
        }
      </Wrapper>
    
    </div>
  )
}

export default Carousel
