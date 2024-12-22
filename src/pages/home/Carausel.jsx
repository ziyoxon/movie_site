import React, { memo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";

const CarauselItem = ({ movies }) => {
  const [thumbsSwiper] = useState(null);

  const renderHeroItems = (withDetails = false) =>
    movies?.map((movie) => (
      <SwiperSlide key={movie.id} className="relative mt-10">
        <img
          src={`${import.meta.env.VITE_IMAGE_URL}${movie.backdrop_path}`}
          alt={movie?.title || "Movie Image"}
          className="w-full h-[500px] object-cover"
        />
        {withDetails && (
          <div className="absolute left-0 bottom-[40px] text-white flex flex-col items-center justify-center gap-2 w-full bg-gradient-to-t from-black via-transparent to-transparent">
            <h2 className="text-[32px] font-medium leading-10">
              {movie.title}
            </h2>
            <p className=" text-sm leading-4">{movie.release_date}</p>
            <span >Rating: {movie.vote_average}</span>
            
          </div>
        )}
      </SwiperSlide>
    ));

  return (
    <div className="dark:bg-black">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2 container h-[500px]"
      >
        {renderHeroItems(true)}
      </Swiper>
    </div>
  );
};

export default memo(CarauselItem);
