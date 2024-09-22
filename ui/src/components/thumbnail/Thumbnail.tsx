import React from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./index.scss"

const Thumbnail = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
                delay: 4000
            }}
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
        >
            <SwiperSlide>
                <img 
                    width={"100%"} 
                    src="/assets/thumbnail.jpg" 
                    className="img" 
                    alt="thumbnail"
                    style={{ objectFit: "cover", maxHeight: "150px"}} 
                />
            </SwiperSlide>
            <SwiperSlide>
                <img 
                    width={"100%"} 
                    src="/assets/thumbnail2.png" 
                    className="img" 
                    alt="thumbnail"
                    style={{ objectFit: "cover", maxHeight: "150px"}} 
                />
            </SwiperSlide>
        </Swiper>
    );
};

export default Thumbnail;
