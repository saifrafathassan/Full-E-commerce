import { Fragment, useContext, useState, useEffect } from "react"
import { Dialog, Transition } from '@headlessui/react'
import myContext from "../../context/data/myContext"
import { Link } from 'react-router-dom'
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi'
import { RxCross2 } from 'react-icons/rx'
// import Img from '../../assets/user.png'
import { useSelector } from "react-redux"
import { IoIosArrowUp} from 'react-icons/io'
import { motion, AnimatePresence  } from 'framer-motion';
import LanguageSwitcher from '../languageswitcher/Languageswitcher'
import { withTranslation  } from 'react-i18next';

const Navbar = ({ t }) => {
  const context = useContext(myContext)
  const {mode, toggleMode} = context
  const [open, setOpen] = useState(false)
  const [showButton, setShowButton] = useState(false);

  const messages = [
    t('message1'),
    t('message2'),
    t('message3'),
  ];


  // scrool to top button
useEffect(() => {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 500) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  });
}, []);

const scrollTo = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollTo);
    window.scrollTo(0, c - c / 8); 
  }
};

  // save user auth
  const user = JSON.parse(localStorage.getItem('user'))

  const logout = () => {
    localStorage.clear('user')
    window.location.href = "/login"
  }

  const cartItems = useSelector((state) => state.cart)


  // top bar sale bar
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
{/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto pb-12 shadow-xl bg-white" style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '', color: mode === 'dark' ? 'white' : '', }}>
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-8 py-6">
                  
                  <Link to={'/allproducts'} className="text-sm font-medium text-gray-900 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                  {t('All Products')}
                  </Link>

                  {user ? '' : <div className="flow-root"><Link to={'/signup'} className="text-md font-medium py-1 px-5 bg-main rounded-full text-white cursor-pointer  " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    {t('Sign&Up')}
                  </Link></div>}

                  {user ? <div className="flow-root">
                    <Link to={'/account'} style={{ color: mode === 'dark' ? 'white' : '', }} className="-m-2 block p-2 font-medium text-gray-900">
                      {t('My Account')}
                    </Link>
                  </div> : ''}

                  {user?.user?.email === 'saif@gmail.com' ? <div className="flow-root">
                    <Link to={'/dashboard'} className="-m-2 block p-2 font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      {t('Admin')}
                    </Link>
                  </div> : ''}

                    
                    {user ? <div className="flow-root">
                    <a onClick={logout} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      {t('Logout')}
                    </a>
                  </div> : ''}

                  {/* <div className="flow-root">
                    <Link to={'/'} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src={Img}
                        alt="user img" />
                      </Link>
                  </div> */}
                  <div className="flow-root cursor-pointer w-[110px]">
                    <LanguageSwitcher />
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>


      {/* desktop  */}
      <header className="relative bg-white">
      <div
        className="flex h-10 items-center justify-center w-full bg-gradient-to-r from-yellow-700 to-yellow-300 px-4 text-sm sm:text-lg font-medium text-white sm:px-6 lg:px-8"
        style={{
          backgroundColor: mode === 'dark' ? 'rgb(62 64 66)' : '',
          color: mode === 'dark' ? 'white' : '',
        }}
      >
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className="absolute"
          >
            {messages[index]}
          </motion.div>
        </AnimatePresence>
      </div>

        <nav aria-label="Top" className="px-4 sm:px-6 lg:px-8 shadow-xl " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
          <div>
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)} style={{ backgroundColor: mode === 'dark' ? 'rgb(80 82 87)' : '', color: mode === 'dark' ? 'white' : '', }}
              >
                <span className="sr-only">Open menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={'/'} className='flex'>
                  <div className="flex ">
                    <h1 className='text-xl sm:text-3xl font-bold text-main sm:pl-8 py-1' style={{ color: mode === 'dark' ? 'white' : '', }}>{t('Swift Store')}</h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">

                  <Link to={'/allproducts'} className="text-md font-medium text-gray-700 duration-300 hover:text-yellow-600 hover:scale-110" style={{ color: mode === 'dark' ? 'white' : '', }}>
                    {t('All Products')}
                  </Link>
                  

                  {user ? '' : <Link to={'/signup'} className="text-md font-medium pb-1 px-4 bg-main rounded-full text-white cursor-pointer  " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    {t('Sign&Up')}
                  </Link>}

                    {user ? <a onClick={logout} className="text-md font-medium text-gray-700 cursor-pointer duration-300 hover:text-yellow-600 hover:scale-110 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    {t('Logout')}
                  </a> : ''}

                      {user && user?.user?.email !== 'saif@gmail.com' ? <Link to={'/account'} className="text-md font-medium text-gray-700 duration-300 hover:text-yellow-600 hover:scale-110" style={{ color: mode === 'dark' ? 'white' : '', }}>
                    {t('My Account')}
                  </Link> : ''}

                  {user?.user?.email === 'saif@gmail.com' ? <Link to={'/dashboard'} className="text-md font-medium text-gray-700 duration-300 hover:text-yellow-600 hover:scale-110" style={{ color: mode === 'dark' ? 'white' : '', }}>
                    {t('Admin')}
                  </Link> : ''}
                </div>

                {/* <div className="hidden lg:ml-8 lg:flex">
                </div>
                <div className="hidden lg:ml-8 lg:flex">
                      <a href="#" className="flex items-center text-gray-700 ">
                    <img
                      className="inline-block w-10 h-10 rounded-full"
                      src={user.img ? user.img : ''}
                      alt="user img" />
                  </a>
                </div> */}

                {/* Search */}
                <div className="flex lg:ml-4">
                  <button className='' onClick={toggleMode}>
                    {/* <MdDarkMode size={35} style={{ color: mode === 'dark' ? 'white' : '' }} /> */}
                    {mode === 'light' ?
                      (<FiSun size={30} />
                      ) : 'dark' ?
                        (<BsFillCloudSunFill size={30} />
                        ) : ''}
                  </button>
                  <div className="md:block hidden">
                    <LanguageSwitcher/>
                  </div>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root">
                  <Link to={'/cart'} className="group -m-2 flex items-center p-2 duration-300 hover:scale-110" style={{ color: mode === 'dark' ? 'white' : '', }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                    <span className="ml-2 text-sm font-medium text-gray-700 group-" style={{ color: mode === 'dark' ? 'white' : '', }}>{cartItems.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {showButton && (
        <button className='bg-yellow-700 flex justify-center items-center rounded-full h-[50px] w-[50px] fixed right-0 bottom-0 mb-[20px] sm:mb-[40px] mr-[30px] sm:mr-[40px] z-[1000] hover:bg-white duration-300 hover:border-black border-yellow-700 border-2' onClick={scrollTo}>
          <IoIosArrowUp className="text-white hover:text-black duration-300" size={30}/>
        </button>
      )}
    </div>
  )
}

export default withTranslation()(Navbar);
