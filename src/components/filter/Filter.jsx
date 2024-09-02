import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import myContext from '../../context/data/myContext';

function Filter() {
    const context = useContext(myContext);
    const { mode, searchkey, setSearchkey, filterType, setFilterType, product  } = context;

    return (
        <div className='container mx-auto px-4 mt-5'>
            <motion.div
                className="p-5 rounded-full bg-gray-300 drop-shadow-xl border border-gray-300"
                style={{
                    backgroundColor: mode === 'dark' ? '#282c34' : '',
                    color: mode === 'dark' ? 'white' : '',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                whileHover={{ scale: 1.02 }}
            >
                <div className="relative">
                    <div className="absolute flex items-center ml-2 h-full">
                        <svg className="w-4 h-4 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z" />
                        </svg>
                    </div>
                    <motion.input
                        type="text"
                        name="searchkey"
                        id="searchkey"
                        value={searchkey}
                        onChange={e => setSearchkey(e.target.value)}
                        placeholder="Search here"
                        className="px-8 py-3 w-full rounded-full bg-violet-0 border-transparent outline-0 text-sm"
                        style={{
                            backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '',
                            color: mode === 'dark' ? 'white' : '',
                        }}
                        whileFocus={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </motion.div>
            <div className="flex items-center justify-between mt-4 bg-gray-300 p-4 rounded-full">
                <p className="font-medium text-gray-600 pl-4">
                    Filters
                </p>
                <button
                    className="px-6 mr-2 py-2 bg-gray-50 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-full"
                    style={{ color: mode === 'dark' ? 'white' : '' }}
                    onClick={() => {
                        setSearchkey('');
                        setFilterType('');
                    }}
                >
                    Reset Filter
                </button>
            </div>
        <div className="mt-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-6 py-3 w-full rounded-full bg-gray-50 border border-gray-300 outline-0 focus:border-gray-500 focus:bg-white text-sm shadow-md transition-all duration-300 appearance-none custom-select"
                style={{
                    backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '',
                    color: mode === 'dark' ? 'white' : '',
                    maxWidth: '600px',
                    minWidth: '500px',
                }}
            >
                <option value="" disabled>
                Select Category
                </option>
                {[...new Set(product.map((item) => item.category))].map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            </div>
        </div>
        </div>
    );
}

export default Filter;
