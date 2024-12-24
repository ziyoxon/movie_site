import React, { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import MoviesItem from "./MoviesItem";

const Movies = ({ data, bg }) => {
  return (
    <div className="dark:bg-black container py-14">
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2 h-auto"
      >
        {data?.results?.map((movie) => (
          <SwiperSlide key={movie?.id}>
            <MoviesItem {...movie} bg={bg} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default memo(Movies);