import Image from 'next/image';
import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import BannerImage1 from '../../public/img/banner-1.jpg';
import BannerImage2 from '../../public/img/banner-2.jpg';
import BannerImage3 from '../../public/img/banner-3.jpg';

const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}>
        <div>
          <Image src={BannerImage1} alt="Banner 1" />
        </div>

        <div>
          <Image src={BannerImage2} alt="Banner 2" />
        </div>

        <div>
          <Image src={BannerImage3} alt="Banner 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
