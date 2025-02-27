import React from "react";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from '../../../hooks/useFetch';

const Similar = ({ mediaType, id, img }) => {
    const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);
    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    // Provide a fallback image if img is not provided or similar data has no images
    const fallbackImg = img || "path/to/your/fallback-image.jpg"; // You can adjust this path accordingly

    return (
        <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
            img={fallbackImg}
        />
    );
};

export default Similar;
