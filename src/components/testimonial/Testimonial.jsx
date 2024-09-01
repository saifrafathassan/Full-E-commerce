import React,{useRef, useEffect, useState} from 'react'
import Man from '../../assets/man.jpg'
import Man3 from '../../assets/man3.jpg'
import Man2 from '../../assets/man2.png'
import Women from '../../assets/women.jpg'
import { FaQuoteRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {IoIosArrowForward, IoIosArrowBack} from 'react-icons/io'
import Slider from 'react-slick';
import { motion } from 'framer-motion'

const TesImages = [
  { image: Man, name: 'Steven Gerrard', contry: 'USA',       content: 'I recently purchased a jacket from Swift-Store, and Im extremely happy with the quality. The fabric is excellent, and the details are well-crafted, making me feel both comfortable and stylish. The delivery was fast.....'},
  { image: Man2, name: 'Jhon kenway', contry: 'Barazill',    content: 'I ordered a shirt from Swift-Store, and it turned out to be a great choice. The color and fit are just as described, and the quality is top-notch. The delivery was fast, and everything arrived in perfect condition. Swift-Store has definitely'},
  { image: Women, name: 'Kristina Castle', contry: 'German', content: 'I recently got a hoodie from Swift-Store, and it exceeded my expectations. The fabric is soft, and the design is exactly as shown on the website. Delivery was prompt, and the whole experience was seamless. I’m definitely coming back for more!'},
  { image: Man3, name: 'Mark polo', contry: 'Belgrade',      content: 'I bought a pair of jeans from Swift-Store, and I’m really impressed. The fit is perfect, and the material feels durable and comfortable. Shipping was quick, and the entire process was smooth and hassle-free. I highly recommend Swift-Store'}
];


const Reviewed = () => {
  const sliderRef = useRef();
  const sectionRef = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);

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
    arrows: true,
}

  return (
    <div ref={sectionRef} className='bg-[#f8f8f8] pt-20 overflow-hidden'>
      <motion.div
      initial={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className='w-full'
      >
      <div className="heading flex gap-5 flex-col items-center text-black w-full">
        <h2 className='text-[22px] font-bold'>Reviewed by People</h2>
        <h1 className='text-[27px] md:text-[42px] font-extrabold'>Client's Testimonials</h1>
        <p className='text-[#706f7b] text-[16px] md:w-[700px] text-center px-5'>Discover the positive impact we've made on the our clients by reading through their testimonials. Our clients have experienced our service and results, and they're eager to share their positive experiences with you.</p>
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
          <div className='flex justify-center py-20 mx-auto my-8'>
          <div className="card-1 w-[400px] md:w-[800px] mx-auto rounded-2xl p-20 pb-8 sm:px-[100px] sm:py-[40px] bg-[#fff] shadow-2xl shadow-gray-500/50">
            <p className='text-[17px] md:text-[22px] font-[500]'>{obj.content}</p>
            <div className='flex justify-between items-center pt-7'>
              <div className='flex items-center justify-center'>
                <img className='rounded-[50%] object-cover w-[112px] h-[112px]' src={obj.image} alt="testimonial" />
                <div className='flex flex-col pl-6'>
                  <h2 className='text-[20px] font-bold'>{obj.name}</h2>
                  <h3 className='text-[18px]'>{obj.contry}</h3>
                </div>
              </div>
              <span className='text-main sm:block hidden'><FaQuoteRight size={30}/></span>
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
        <div className="h-full top-[-350px] md:top-[-300px] relative z-[200] w-full flex md:px-12 justify-between">
                <div className="cursor-pointer hover:text-main duration-300" onClick={() => sliderRef.current.slickPrev()}><IoIosArrowBack size={40}/></div>
                <div className="cursor-pointer hover:text-main duration-300" onClick={() => sliderRef.current.slickNext()}><IoIosArrowForward size={40}/></div>
            </div>
            </motion.div>
      </div>

  )
}

export default Reviewed

