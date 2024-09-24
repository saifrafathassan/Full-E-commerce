import React, { useRef, useEffect, useState, useContext } from 'react'
import myContext from '../../context/data/myContext';
import Man from '../../assets/man.jpg'
import Man3 from '../../assets/man3.jpg'
import Man2 from '../../assets/man2.png'
import Women from '../../assets/women.jpg'
import { FaQuoteRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import Slider from 'react-slick';
import { motion } from 'framer-motion'
import {withTranslation} from 'react-i18next'


const Reviewed = ({t}) => {
  const TesImages = [
    { image: Man, name: 'Steven Gerrard', contry: t('contry1'), content: t('content1') },
    { image: Man2, name: 'Jhon Kenway', contry: t('contry2'), content: t('content2') },
    { image: Women, name: 'Kristina Castle', contry: t('contry3'), content: t('content3') },
    { image: Man3, name: 'Mark Polo', contry: t('contry4'), content: t('content4') }
  ];

  const sliderRef = useRef();
  const sectionRef = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);
  const context = useContext(myContext);
  const { mode } = context; 

  useEffect(() => {
    setHasAnimated(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const settings = {
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: true,
    arrows: false,
  };

  return (
    <div
      ref={sectionRef}
      className={`pt-20 overflow-hidden ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-[#f8f8f8] text-black'}`}
    >
      <motion.div
        initial={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className='w-full'
      >
        <div className={`heading flex gap-5 flex-col items-center w-full ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
          <h2 className='text-[22px] font-bold'>{t('Reviewed by People')}</h2>
          <h1 className='text-[27px] md:text-[42px] font-extrabold'>{t('Client')}</h1>
          <p className={`text-[15px] md:w-[700px] text-center px-5 ${mode === 'dark' ? 'text-gray-300' : 'text-[#706f7b]'}`}>
            {t('Discover the positive')}
          </p>
        </div>
      </motion.div>

      <Slider ref={sliderRef} {...settings}>
        {TesImages.map((obj, index) => (
          <motion.div
            initial={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className='w-full'
            key={index}
          >
            <div className='flex justify-center pb-12 mx-auto my-8'>
              <div className={`card-1 h-[400px] w-[400px] md:w-[800px] mx-auto rounded-2xl p-14 ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-[#fff]'} shadow-2xl shadow-gray-500/50`}>
                <p className='text-[15px] md:text-[22px] font-[500]'>{obj.content}</p>
                <div className='flex justify-between items-center pt-7'>
                  <div className='flex items-center justify-center'>
                    <img className='rounded-[50%] object-cover w-[112px] h-[112px]' src={obj.image} alt="testimonial" />
                    <div className='flex flex-col pl-6'>
                      <h2 className='text-[20px] font-bold'>{obj.name}</h2>
                      <h3 className='text-[18px]'>{obj.contry}</h3>
                    </div>
                  </div>
                  <span className='text-main sm:block hidden'><FaQuoteRight size={30} /></span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>

      <motion.div
        initial={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className='w-full'
      >
        <div className={`h-full top-[-320px] md:top-[-300px] relative z-[200] w-full flex md:px-12 justify-between ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
          <div className={`cursor-pointer hover:text-main duration-300 ${mode === 'dark' ? 'text-white' : 'text-black'}`} onClick={() => sliderRef.current.slickPrev()}>
            <IoIosArrowBack size={30} />
          </div>
          <div className={`cursor-pointer hover:text-main duration-300 ${mode === 'dark' ? 'text-white' : 'text-black'}`} onClick={() => sliderRef.current.slickNext()}>
            <IoIosArrowForward size={30} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default withTranslation()(Reviewed);
