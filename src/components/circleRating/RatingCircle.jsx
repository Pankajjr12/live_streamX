import React from 'react'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import '../circleRating/rating.scss'
import Star from '../../assets/ratingStar.png'
const RatingCircle= ({ rating }) => {

  return (
    <div className='circleRating'>
      <img src={Star} />
      <p style={{"color": rating < 5 ? "red" : rating < 7 ? "orange" : "green"}}>{rating}</p>
    </div>
  );
};

export default RatingCircle
