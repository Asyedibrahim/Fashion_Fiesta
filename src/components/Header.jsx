import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Button, Dropdown, Label, Modal, TextInput } from 'flowbite-react';
import { IoPerson } from "react-icons/io5";

export default function Header() {

  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

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
            <NavLinkLg to="/" label="Home" currentPath={location.pathname} />
            <NavLinkLg to="/collections" label="Collections" currentPath={location.pathname} />
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

          <Button gradientMonochrome='pink' size='xs' onClick={() => setOpenModal(true)}>Login</Button>

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
        <nav ref={navRef} className="md:hidden bg-white shadow-md transition-height max-h-0">
          <NavLink to="/" label="Home" currentPath={location.pathname} setIsOpen={setIsOpen} />
          <NavLink to="/collections" label="Collections" currentPath={location.pathname} setIsOpen={setIsOpen} />
        </nav>
      )}

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                required
                autoComplete='off'
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" placeholder='*********' required />
            </div>
            
            <div className="w-full">
              <Button gradientMonochrome='pink'>Log in to your account</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 ">
              Not registered?&nbsp;
              <button className="text-[#ff008a] hover:underline">
                Create account
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </header>
  );
}

function NavLink({ to, label, currentPath, setIsOpen }) {
    const isActive = currentPath === to;
  
    return (
      <Link
        to={to}
        className={`block px-4 py-2 text-gray-700 hover:text-[#ff008a] ${isActive ? 'font-bold !text-[#ff008a]' : ''}`}
        onClick={() => setIsOpen(false)} // Close menu on click
      >
        {label}
      </Link>
    );
}
function NavLinkLg({ to, label, currentPath }) {
    const isActive = currentPath === to;
  
    return (
      <Link
        to={to}
        className={`text-gray-700 hover:text-[#ff008a] ${isActive ? 'font-bold !text-[#ff008a]' : ''}`}
      >
        {label}
      </Link>
    );
}
