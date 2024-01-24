import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "../detailBanner/style.scss";
import Wrapper from '../../../components/wrapper/Wrapper'
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres"
import Star from "../../../assets/ratingStar.png"
import Img from '../../../components/lazyloadImg/Img'
import PosterFallback from "../../../assets/no-poster.png";
import { PlayBtn } from "../../../components/playBtn/PlayBtn";
import  VideoPopUp  from '../../../components/videoPop/VideoPopUp'

const DetailsBanner = ({ video, crew, review }) => {

    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}`)
    const [ show,setShow ] = useState(false)
    const [ videoId,setVideoId ] = useState(null)
    const { url } = useSelector((state) => state.home)
    const _genres = data?.genres.map((g) => g.id)


    const director = crew?.filter((f) => f.job === "Director");
    const production = crew?.filter((f) => f.job === "Producer");
    const writer = crew?.filter(
        (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>

                            <div className="backdrop-img">
                                <Img src={url.backdrop + data?.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <Wrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (
                                            <Img className="posterImg" src={url.backdrop +
                                                data.poster_path} />
                                        ) : (

                                            <Img className="posterImg" src={PosterFallback} />
                                        )
                                        }
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${data.name || data.title}`}
                                            <p className="releaseYear">Release Date : {dayjs(data?.release_date).format("YYYY")}</p>
                                        </div>

                                        <div className="subtitle">
                                            {data.tagline}
                                        </div>

                                        <Genres data={_genres} />

                                        <div className="row">
                                            <h1> {data?.vote_average.toFixed(1)}</h1>
                                            <img src={Star} />

                                            <div className="playbtn" onClick={() => { setShow(true)
                                            setVideoId(video.key)
                                            }}>
                                                <PlayBtn />
                                                <span className="text">
                                                    Watch Trailer
                                                </span>
                                            </div>
                                        </div>
                                        <div className="overview">
                                            <div className="heading">
                                                Overview
                                            </div>
                                            <div className="description">
                                                {data.overview}
                                            </div>

                                        </div>
                                        <div className="info">
                                            {data.status &&
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Status  {" "}
                                                    </span>
                                                    <span className="text">
                                                        {data.status}
                                                    </span>
                                                </div>
                                            }
                                            {data.release_date && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Release Date  {" "}
                                                    </span>
                                                    <span className="text">
                                                        {dayjs(data.release_date).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Runtime  {" "}
                                                    </span>
                                                    <span className="text">
                                                        {toHoursAndMinutes(data.runtime)}
                                                    </span>
                                                </div>
                                            )}


                                        </div>
                                        {director?.length > 0 && (
                                            <div className="info">

                                                <span className="text bold">
                                                    Director {" "}
                                                </span>
                                                <span className="text">
                                                    {director?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {director.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {writer?.length > 0 && (
                                            <div className="info">

                                                <span className="text bold">
                                                    Writer {" "}
                                                </span>
                                                <span className="text">
                                                    {writer?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {writer.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                        {data?.created_by?.length > 0 && (
                                            <div className="info">

                                                <span className="text bold">
                                                    Creator {" "}
                                                </span>
                                                <span className="text">
                                                    {data?.created_by?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {data?.created_by.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {production?.length > 0 && (
                                            <div className="info">

                                                <span className="text bold">
                                                    Producer {" "}
                                                </span>
                                                <span className="text">
                                                    {production?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {production.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopUp 
                                show={show}
                                setShow={setShow}
                                videoId={videoId}
                                setVideoId={setVideoId}
                                />
                            </Wrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <Wrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </Wrapper>
                </div>
            )}
        </div>
    )
}

export default DetailsBanner
