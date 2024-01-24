import React from 'react'
import Wrapper from '../wrapper/Wrapper'
import Img from '../lazyloadImg/Img'
import { useSelector } from "react-redux";
import avatar from '../../assets/avatar.png'
import '../../components/cast/style.scss'
const Casting = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <Wrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {data?.map((item)=>{
                            let imgUrl = item.profile_path
                            ? url.profile + item.profile_path
                            :avatar;
                            return(
                                <div key={item.id} className='listItem'>
                                    <div className='profileImg'>
                                        <Img src={imgUrl}/>
                                    </div>
                                    <div className='name'>{item.name}</div>
                                    <div className='character'>{item.character}</div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </Wrapper>
        </div>
    );
};

export default Casting
