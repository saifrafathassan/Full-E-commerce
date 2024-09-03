import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import Slider1 from '../../assets/shop1.jpg';
import Slider2 from '../../assets/shop8.jpg';
import Slider3 from '../../assets/shop3.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

const slides = [
  { image: Slider1 },
  { image: Slider2 },
  { image: Slider3 }
];

const HeroSection = () => {
  const sliderRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setIsVisible(true);
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  const settings = {
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: true,
    arrows: false, // Disable default arrows
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <div 
      onMouseLeave={() => setIsHovered(false)} 
      onMouseEnter={() => setIsHovered(true)} 
      className='hero-container h-[420px] sm:h-[550px] relative'
    >
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className='relative'>
            <img className='w-full h-[400px] sm:h-[550px] object-cover' src={slide.image} alt={`heroimg${index}`} />
            <div className='overlay h-[400px] sm:h-[550px] w-full'></div>
            <div style={{
              opacity: isVisible && currentSlide === index ? 1 : 0,
              transform: isVisible && currentSlide === index ? 'translateX(0)' : 'translateX(60px)',
              transition: 'opacity 2s, transform 2s',
            }} ref={sectionRef} className='absolute inset-0 flex justify-center items-center'>
              <div className='text-white text-center text-[20px] sm:text-4xl font-bold px-4 py-2'>
                Welcome to <span className='text-main'>Swift-Store</span><br />
                Your Amazing Shopping Destination
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="arrow-container">
        <div 
          onClick={() => sliderRef.current.slickPrev()} 
          className={`arrow arrow-left ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <BsArrowLeftShort size={30} />
        </div>
        <div 
          onClick={() => sliderRef.current.slickNext()} 
          className={`arrow arrow-right ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <BsArrowRightShort size={30} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
