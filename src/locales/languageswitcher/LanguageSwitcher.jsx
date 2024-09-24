import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [hover, setHover] = useState(false);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <div
      className="relative mr-4 lg:mx-2 border bg-main text-white py-1 pl-2 lg:px-3 font-semibold rounded-full"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* عرض اللغة الحالية */}
      <button className="focus:outline-none flex items-center">
        {currentLanguage === 'ar' ? 'العربية' : 'English'}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 ml-2 transition-transform ${hover ? 'rotate-180' : ''}`} 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </svg>
      </button>

      {/* قائمة منسدلة عند التمرير */}
      {hover && (
        <ul className="absolute z-20 bg-white text-black rounded mt-1 p-2 shadow-lg">
          {currentLanguage === 'ar' ? (
            <li>
              <button className="w-full text-left hover:bg-gray-200 p-2 rounded" onClick={() => handleLanguageChange('en')}>
                English
              </button>
            </li>
          ) : (
            <li>
              <button className="w-full text-left hover:bg-gray-200 p-2 rounded" onClick={() => handleLanguageChange('ar')}>
                العربية
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
