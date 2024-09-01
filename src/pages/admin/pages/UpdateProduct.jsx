import React, { useContext } from 'react';
import { toast } from 'react-toastify'; 
import myContext from '../../../context/data/myContext';
import Loader from '../../../components/loader/Loader';

function UpdateProduct() {
    const context = useContext(myContext);

    const { products, setProducts, updateProduct, loading } = context;

    async function handleUpdate() {
        try {
            await updateProduct();
        } catch (error) {
            toast.error('Error Please Try Agine');
        }
    }

    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader />}
                <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Update Product</h1>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={products.title}
                            onChange={(e) => setProducts({ ...products, title: e.target.value })}
                            name='title'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Title'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={products.price}
                            onChange={(e) => setProducts({ ...products, price: e.target.value })}
                            name='price'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Price'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={products.imageUrl}
                            onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                            name='imageurl'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Image (url)'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={products.category}
                            onChange={(e) => setProducts({ ...products, category: e.target.value })}
                            name='category'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Category'
                        />
                    </div>
                    <div>
                        <textarea
                            cols="30"
                            rows="10"
                            name='description'
                            value={products.description}
                            onChange={(e) => setProducts({ ...products, description: e.target.value })}
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Description'>
                        </textarea>
                    </div>
                    <div>
                        <input
                            type="number"
                            value={products.order || ''}
                            onChange={(e) => setProducts({ ...products, order: e.target.value })}
                            name='order'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Sort number'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={products.brand || ''}
                            onChange={(e) => setProducts({ ...products, brand: e.target.value })}
                            name='brand'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Brand Name'
                        />
                    </div>
                    <div className='flex justify-center mb-3'>
                        <button
                            onClick={handleUpdate}
                            className='bg-main w-full text-white font-bold px-2 py-2 rounded-lg'>
                            Update Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;
