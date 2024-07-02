import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

export default function Header() {

  const [isOpen, setIsOpen] = useState(null)
  const navRef = useRef(null);

  useEffect(() => {
    if (navRef.current) {
      if (isOpen) {
        navRef.current.style.maxHeight = `${navRef.current.scrollHeight}px`;
      } else {
        navRef.current.style.maxHeight = '0px';
      }
    }
  }, [isOpen]);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        <div className="text-md sm:text-xl font-bold">
          <Link to="/">Fashion Fiesta</Link>
        </div>

        <nav className="hidden md:flex space-x-4">
            <NavLink to='/' className={({isActive}) => isActive ? 'text-[#ff008a] font-semibold' : ''}>Home</NavLink>
            <NavLink to="/collections" className={({isActive}) => isActive ? 'text-[#ff008a] font-semibold' : ''}>Collections</NavLink>
        </nav>

        <div className="flex items-center space-x-4 sm:space-x-6">

          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-gray-700 hover:text-[#ff008a] text-xl sm:text-2xl" />
            <span className="absolute top-0 left-4 sm:left-5 bg-red-500 text-white text-xs rounded-full px-1">7</span>
          </Link>

          <Link to="/" className="relative">
            <FaHeart className="text-gray-700 hover:text-[#ff008a] text-xl sm:text-2xl" />
            <span className="absolute top-0 left-4 sm:left-5 bg-red-500 text-white text-xs rounded-full px-1">2</span>
          </Link>

          {/* <Dropdown label={<IoPerson className='text-gray-700 -mr-2 text-xl sm:text-2xl'/>} inline>
            <Dropdown.Item>Sign In</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Separated link</Dropdown.Item>
          </Dropdown> */}

          <Link to='/sign-in' className='bg-[#f7128c] text-white px-3 py-[5px] rounded-md text-[14px] font-semibold hover:bg-[#f0158a]'>Login</Link>


        </div>

        {!isOpen && (
          <button onClick={() => setIsOpen(true)} className="md:hidden text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
          </button>
        )}
        
        {isOpen && (
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <nav ref={navRef} className=" md:hidden bg-white shadow-md transition-height max-h-0">

          <NavLink 
            to='/' 
            className={({isActive}) => isActive ? 'text-[#ff008a] font-semibold block px-4 py-2' : 'block px-4 py-2 text-gray-700 hover:text-[#ff008a]'} 
            onClick={() => setIsOpen(false)}>
              Home
          </NavLink>

          <NavLink 
            to="/collections" 
            className={({isActive}) => isActive ? 'text-[#ff008a] font-semibold block px-4 py-2' : 'block px-4 py-2 text-gray-700 hover:text-[#ff008a]'} 
            onClick={() => setIsOpen(false)}>
              Collections
          </NavLink>
          
        </nav>
      )}

    </header>
  );
}
