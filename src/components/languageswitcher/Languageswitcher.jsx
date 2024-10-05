import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const LanguageSwitcher = () => {
const { i18n } = useTranslation();
const [hover, setHover] = useState(false);

const currentLanguage = i18n.language.split('-')[0];
const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
};


return (
    <div 
    className='relative lg:ms-3 border bg-main text-white font-semibold py-1 px-3 rounded-full'
    onMouseEnter={() => setHover(true)} 
    onMouseLeave={() => setHover(false)}
    >
    <button className='focus:outline-none flex items-center'>
        <span>{currentLanguage === 'ar' ? 'العربية' : 'English'}</span>
        <svg className='w-4 h-4 ms-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
        </svg>
    </button>

    {hover && (
        <ul className='absolute z-20 bg-white text-black rounded-lg mt-1 p-2 shadow-lg w-24'>
        {currentLanguage !== 'ar' && (
        <li className='hover:bg-gray-100 transition-colors rounded'>
            <button className='w-full text-end py-1 px-2' onClick={() => handleLanguageChange('ar')}>العربية</button>
        </li>
        )}
        {currentLanguage !== 'en' && (
        <li className='hover:bg-gray-100 transition-colors rounded'>
            <button className='w-full text-start py-1 px-2' onClick={() => handleLanguageChange('en')}>English</button>
        </li>
        )}
        </ul>
    )}
    </div>
);
};

export default LanguageSwitcher; 