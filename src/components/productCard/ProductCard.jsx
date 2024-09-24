import React, { useContext, useEffect, useCallback } from 'react';
import myContext from '../../context/data/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import Shirt from '../../assets/t-shirt.jpg';
import Bags from '../../assets/bags.jpg';
import Shoe from '../../assets/shoe.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { withTranslation } from 'react-i18next';

const ProductCard = ({ t }) => {
    const context = useContext(myContext);
    const { mode, product, searchkey, filterType } = context;

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    // Add to cart
    const addCart = useCallback((product) => {
        dispatch(addToCart(product));
        toast.success('Added to cart');
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const bannerImages = [
        { image: Bags, text: t('discover_bags') }, 
        { image: Shoe, text: t('find_shoes') },
        { image: Shirt, text: t('upgrade_shirts') },
    ];

    const sortedProducts = [...product].sort((a, b) => a.order - b.order);

    const showBanners = searchkey === '' && filterType === '';

    const sliderSettings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    // Group products into rows of 4
    const groupedProducts = [];
    for (let i = 0; i < sortedProducts.length; i += 4) {
        groupedProducts.push(sortedProducts.slice(i, i + 4));
    }

    const filteredProducts = sortedProducts
        .filter((obj) => obj.title.toLowerCase().includes(searchkey.toLowerCase()))
        .filter((obj) => obj.category.toLowerCase().includes(filterType.toLowerCase()));

    // Group filtered products into rows of 4
    const groupedFilteredProducts = [];
    for (let i = 0; i < filteredProducts.length; i += 4) {
        groupedFilteredProducts.push(filteredProducts.slice(i, i + 4));
    }

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container py-8 md:py-16 mx-auto">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10 text-center items-center mx-auto">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        {t('Available Products')}
                    </h1>
                    <p className='text-[#706f7b] text-[16px] md:w-[700px] text-center px-5'>
                        {t('Explore our curated')}
                    </p>
                </div>

                {/* Display the first banner image (Bags) before the first row */}
                {showBanners && (
                    <div className="w-full flex justify-center mt-6 relative group">
                        <img src={bannerImages[0].image} alt="Bags Banner" className="w-full h-auto rounded-lg transition-all duration-300 group-hover:brightness-50" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-white sm:text-2xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                                {bannerImages[0].text}
                            </p>
                        </div>
                    </div>
                )}

                {/* Slider for small screens */}
                <div className="md:hidden">
                    {groupedFilteredProducts.map((group, index) => (
                        <Slider key={index} {...sliderSettings} className="mb-6">
                            {group.map((item) => (
                                <div key={item.id} className="p-2">
                                    <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                                        style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                        <div onClick={() => window.location.href = `/productinfo/${item.id}`} className="flex justify-center cursor-pointer">
                                            <img className="rounded-2xl w-[400px] h-80 p-2 hover:scale-110 transition-transform duration-300 ease-in-out"
                                                src={item.imageUrl} alt="product" />
                                        </div>
                                        <div className="p-5 border-t-2">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                                                style={{ color: mode === 'dark' ? 'white' : '' }}>{t('Swift Store')}</h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3"
                                                style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h1>
                                            <p className="leading-relaxed mb-3"
                                                style={{ color: mode === 'dark' ? 'white' : '' }}>$ {item.price}</p>
                                            <div className="flex justify-center">
                                                <button onClick={() => addCart(item)} type="button"
                                                    className="focus:outline-none text-white bg-main hover:bg-gray-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2">
                                                    {t('Add To Cart')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))} 
                        </Slider>
                    ))}
                </div>

                {/* Grid for larger screens */}
                <div className="hidden md:flex flex-wrap mt-8">
                    {sortedProducts.filter((obj) => obj.title.toLowerCase().includes(searchkey.toLowerCase()))
                        .filter((obj) => obj.category.toLowerCase().includes(filterType.toLowerCase()))
                        .map((item, index) => {
                            const { title, price, imageUrl } = item;
                            const bannerIndex = Math.floor(index / 4) + 1; // Adjust index for banner
                            return (
                                <React.Fragment key={index}>
                                    <div className="md:w-1/4 drop-shadow-lg p-2">
                                        <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                            <div onClick={() => window.location.href = `/productinfo/${item.id}`} className="flex justify-center cursor-pointer">
                                                <img className="rounded-2xl w-[400px] h-80 p-2 hover:scale-110 transition-transform duration-300 ease-in-out" src={imageUrl} alt="product" />
                                            </div>
                                            <div className="p-5 border-t-2">
                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '' }}>{t('Swift Store')}</h2>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</h1>
                                                <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>$ {price}</p>
                                                <div className="flex justify-center">
                                                    <button onClick={() => addCart(item)} type="button" className="focus:outline-none text-white bg-main hover:bg-gray-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2">{t('Add To Cart')}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Add banner image after every 4 products */}
                                    {showBanners && (index + 1) % 4 === 0 && bannerImages[bannerIndex] && (
                                        <div className="w-full flex justify-center mt-6 relative group">
                                            <img src={bannerImages[bannerIndex].image} alt={`Banner ${bannerIndex + 1}`} className="w-full h-auto rounded-lg transition-all duration-300 group-hover:brightness-50" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <p className="text-white text-2xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded-lg">{bannerImages[bannerIndex].text}</p>
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                </div>
            </div>
        </section>
    );
};

export default withTranslation()(ProductCard);
