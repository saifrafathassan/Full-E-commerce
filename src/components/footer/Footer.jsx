import { IoIosHeart } from "react-icons/io";
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

function Footer({ t }) {
    const context = useContext(myContext);
    const { toggleMode, mode } = context;

    const currentLanguage = i18n.language || i18n.options.fallbackLng[0];

    return (
        <footer className="text-white body-font bg-main" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap md:text-left text-center order-first">
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>{t('categories')}</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <Link to={'/'} className="text-white hover:text-gray-300" style={{ color: mode === 'dark' ? 'white' : '' }}>{t('home')}</Link>
                            </li>
                            <li>
                                <Link onClick={window.scrollTo(0, 0)} to={'/account'} className="text-white hover:text-gray-300" style={{ color: mode === 'dark' ? 'white' : '' }}>{t('order')}</Link>
                            </li>
                            <li>
                                <a className="text-white hover:text-gray-300" style={{ color: mode === 'dark' ? 'white' : '' }}>{t('localForVocal')}</a>
                            </li>
                            <li>
                                <Link onClick={window.scrollTo(0, 0)} to={'/cart'} className="text-white hover:text-gray-300" style={{ color: mode === 'dark' ? 'white' : '' }}>{t('cart')}</Link>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3 uppercase" style={{ color: mode === 'dark' ? 'white' : '' }}>{t('customerService')}</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <Link to={'/returnpolicy'} className="text-white hover:text-gray-300" style={{ color: mode === 'dark' ? 'white' : '' }}>{t('returnPolicy')}</Link>
                            </li>
                            <li>
                                <Link to={'/about'} className="text-white hover:text-gray-300" style={{ color: mode === 'dark' ? 'white' : '' }}>{t('about')}</Link>
                            </li>
                            <li>
                                <Link to={'/contact'} className="text-white hover:text-gray-300" style={{ color: mode === 'dark' ? 'white' : '' }}>{t('contactUs')}</Link>
                            </li>
                        </nav>
                    </div>

                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>{t('services')}</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <Link to={'/privacypolicy'} className="text-white hover:text-gray-300" style={{ color: mode === 'dark' ? 'white' : '' }}>{t('privacy')}</Link>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <img src="https://ecommerce-sk.vercel.app/pay.png" alt="" />
                    </div>
                </div>
            </div>

            <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} className="bg-gray-200" style={{ backgroundColor: mode === 'dark' ? 'rgb(55 57 61)' : '', color: mode === 'dark' ? 'white' : '', }}>
                <div className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">
                    <Link to={'/'} className='flex'>
                        <div className="flex ">
                            <h1 className=' text-2xl font-bold text-transparent bg-clip-text bg-main px-2 pb-1 rounded' style={{ color: mode === 'dark' ? 'white' : '', }}>{t('Swift Store')}</h1>
                        </div>
                    </Link>
                    <p className="text-[12px] sm:text-sm flex items-center gap-1 text-gray-500 sm:ms-6 sm:mt-0 mt-4" style={{ color: mode === 'dark' ? 'white' : '' }}>{t('© 2023 Swift Store — ')}
                        {t('Created With Love')}<IoIosHeart color="red"/> {t('By Saif Rafat')}
                    </p>
                    <span className="inline-flex sm:ms-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                        <a style={{ color: mode === 'dark' ? 'white' : '' }} className="text-main">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                            </svg>
                        </a>
                        <a style={{ color: mode === 'dark' ? 'white' : '' }} className="ms-3 text-main">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                            </svg>
                        </a>
                        <a style={{ color: mode === 'dark' ? 'white' : '' }} className="ms-3 text-main">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                            </svg>
                        </a>
                        <a style={{ color: mode === 'dark' ? 'white' : '' }} className="ms-3 text-main">
                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} className="w-5 h-5" viewBox="0 0 24 24">
                                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                <circle cx={4} cy={4} r={2} stroke="none" />
                            </svg>
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default withTranslation()(Footer);
