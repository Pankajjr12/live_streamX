import React from 'react'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailBanner/DetailsBanner'
import Casting from '../../components/cast/Casting'
import VideoSection from '../../components/videoSection/VideoSection'
import Similar from './carousels/Similar'
import Recommend from './carousels/Recommend'
import NoResult from '../../assets/no-results.png'
const Detail = () => {
  const {mediaType,id} = useParams()
  const {data,loading} =useFetch(`/${mediaType}/${id}/videos`)
  const {data: review,loading:reviewLoading} =useFetch(`/${mediaType}/${id}/reviews`)
  const {data: credits,loading: creditLoading} =useFetch(`/${mediaType}/${id}/credits`)
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Casting data={credits?.cast} loading={creditLoading} />
      <VideoSection data={data} loading={loading}/>
      {loading ?(
        <Similar mediaType={mediaType} id={id} />)
      :(
        <Similar img={NoResult}/>
      )
      }
      <Recommend   mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Detail
