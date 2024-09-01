import React, { useContext, useEffect } from 'react'
import myContext from '../../context/data/myContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { toast } from 'react-toastify'
import Shirt from '../../assets/t-shirt.jpg'
import Bags from '../../assets/bags.jpg'
import Shoe from '../../assets/shoe.jpg'

function ProductCard() {
    const context = useContext(myContext)
    const { mode, product, searchkey } = context;

    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart)

    // add to cart
    const addCart = (product) => {
        dispatch(addToCart(product))
        toast.success('Added to cart');
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    const bannerImages = [
        { image: Bags, text: 'Discover our new collection of bags' },
        { image: Shoe, text: 'Find the perfect pair of shoes' },
        { image: Shirt, text: 'Upgrade your wardrobe with our latest shirts' },
    ];

    const sortedProducts = [...product].sort((a, b) => a.order - b.order);

    return (
        <section className="text-gray-600 body-font">
            <div className="container py-8 md:py-16 mx-auto">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10 text-center items-center mx-auto">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Available Products</h1>
                <p className='text-[#706f7b] text-[16px] md:w-[700px] text-center px-5'> Explore our curated collection of top-quality products that offer unbeatable value. Each item is selected with care to ensure you get the best for your needs at prices you'll love.</p>
            </div>

                {/* Display the first banner image (Bags) before the first row */}
                <div className="w-full flex justify-center mt-6 relative group">
                    <img src={bannerImages[0].image} alt="Bags Banner" className="w-full h-auto rounded-lg transition-all duration-300 group-hover:brightness-50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-white text-2xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                            {bannerImages[0].text}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap mt-8">
                    {sortedProducts.filter((obj) => obj.title.toLowerCase().includes(searchkey)).map((item, index) => {
                        const { title, price, imageUrl } = item;
                        const bannerIndex = Math.floor((index + 1) / 4); // تحديد أي صورة من مجموعة البانر سيتم عرضها بعد كل 4 منتجات

                        return (
                            <React.Fragment key={index}>
                                <div className="md:w-1/4 drop-shadow-lg">
                                    <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                        <div onClick={() => window.location.href = `/productinfo/${item.id}`} className="flex justify-center cursor-pointer">
                                            <img className="rounded-2xl w-[400px] h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out" src={imageUrl} alt="product" />
                                        </div>
                                        <div className="p-5 border-t-2">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '' }}>Swift-Store</h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</h1>
                                            <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>$ {price}</p>
                                            <div className="flex justify-center">
                                                <button onClick={() => addCart(item)} type="button" className="focus:outline-none text-white bg-main hover:bg-gray-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2">Add To Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Add banner image after every 4 products */}
                                {(index + 1) % 4 === 0 && bannerImages[bannerIndex] && (
                                    <div className="w-full flex justify-center mt-6 relative group">
                                        <img src={bannerImages[bannerIndex].image} alt={`Banner ${bannerIndex + 1}`} className="w-full h-auto rounded-lg transition-all duration-300 group-hover:brightness-50" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <p className="text-white text-2xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                                                {bannerImages[bannerIndex].text}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default ProductCard
