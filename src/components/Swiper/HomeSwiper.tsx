import React, { FC, useState } from 'react';
import Swiper, { ReactIdSwiperProps } from 'react-id-swiper'
import 'swiper/css/swiper.css';

export type HomeSwiperProps = {
    images: string[]
}

const HomeSwiper: FC<HomeSwiperProps> = (props) => {
    const [params] = useState({
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            dynamicBullets: true,
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
    } as ReactIdSwiperProps);


    return (
        <Swiper {...params}>
            {props.images.map((image,index) => (
                    <div className="p-media__thumb" key={index}>
                        <img src={image} alt="商品画像"/>
                    </div>
                ))
            }
        </Swiper>
    )
}

export default HomeSwiper;