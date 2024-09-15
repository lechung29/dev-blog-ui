import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./index.scss"

const Thumbnail = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
        >
            <SwiperSlide>
                <img 
                    width={"100%"} 
                    height={150} 
                    src="/assets/thumbnail.jpg" 
                    className="img" 
                    alt="thumbnail" 
                />
            </SwiperSlide>
        </Swiper>
    );
};

export default Thumbnail;
