import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Graphic Designer",
    "Data Science"
]

const CategoryCarousel = () => {
    return (
        <div>
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                autoplay={{ delay: 2000 }}
                className="w-full max-w-lg text-center mx-auto my-20 "
            >
                {category.map((text, index) => (
                    <SwiperSlide  key={index} className=''>
                        <p className="text-xl font-semibold border border-gray-100 rounded-lg shadow-md">
                            {text}
                        </p>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    )
}

export default CategoryCarousel