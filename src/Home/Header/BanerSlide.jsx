import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import banner1 from '../../assets/banner--1.jpg';
import banner2 from '../../assets/banner-2.jpg';
import banner3 from '../../assets/banner-3.jpg';
import { Heart, Smile, Star } from 'lucide-react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const BannerSlide = () => {
    const slides = [
        {
            background: banner1,
            title: "Your Love Story",
            subtitle: "Begins Here",
            description: "Let us help you create the wedding of your dreams",
            icon: <Heart className="w-12 h-12 text-purple-50 animate-bounce" />,
        },
        {
            background: banner2,
            title: "Make Memories",
            subtitle: "That Last Forever",
            description: "Capture your special moments with our expert services",
            icon: <Smile className="w-12 h-12 text-purple-50 animate-bounce" />,
        },
        {
            background: banner3,
            title: "Dream Weddings",
            subtitle: "Tailored Just for You",
            description: "Experience a day like no other with our bespoke plans",
            icon: <Star className="w-12 h-12 text-purple-50 animate-bounce" />,
        },
    ];

    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <div
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(88, 28, 135, 0.6), rgba(219, 39, 119, 0.5)),
                                url(${slide.background})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'top',
                            height: '80vh',
                            width: '100%'
                        }}
                        className="relative flex items-center justify-center"
                    >
                        <div className="text-center space-y-6 px-4 max-w-4xl">
                            <div className="flex justify-center">
                                {slide.icon}
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-purple-50">
                                {slide.title}
                                <span className="block mt-2 text-2xl md:text-3xl font-light">{slide.subtitle}</span>
                            </h1>

                            <p className="text-lg md:text-xl text-purple-50/90 max-w-2xl mx-auto">
                                {slide.description}
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 mt-8">
                                <button className="px-8 py-3 bg-purple-50 text-purple-600 hover:bg-white rounded-full transition-all">
                                    Learn More
                                </button>
                                <button className="px-8 py-3 border-2 border-purple-50 text-purple-50 hover:bg-purple-50/10 rounded-full transition-all">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default BannerSlide;
