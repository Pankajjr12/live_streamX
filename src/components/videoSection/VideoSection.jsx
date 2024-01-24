import React,{  useState } from 'react'
import Wrapper from '../../components/wrapper/Wrapper'
import { PlayBtn } from '../playBtn/PlayBtn';
import VideoPopUp from '../videoPop/VideoPopUp';
import '../../components/videoSection/style.scss'
import Img from '../lazyloadImg/Img';
import NoResult from '../../assets/no-results.png'


const VideoSection= ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

 

    return (

        <div className="videosSection">
            <Wrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {data?.results?.map((video) => (
                            <div
                                key={video.id}
                                className="videoItem"
                                onClick={() => {
                                    setVideoId(video.key);
                                    setShow(true);
                                }}
                            >
                            
                                <div className="videoThumbnail">
                                    
                                        <Img 
                                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                    />
                                    <PlayBtn />

                                 
                                </div>
                               
                            
                                <div className="videoTitle">{video.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    
                   
                    <div className="videoSkeleton">
                        <img src={NoResult}/>
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                   
                )}
            </Wrapper>
            <VideoPopUp
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};
export default VideoSection;