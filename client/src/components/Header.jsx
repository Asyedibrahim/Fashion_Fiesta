import { useState } from 'react';
import { CgMenuGridR } from "react-icons/cg";
import { Link, NavLink } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { TiDeleteOutline } from 'react-icons/ti';
import { HiArrowSmRight } from 'react-icons/hi';
import { MdDashboardCustomize } from 'react-icons/md'
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import { Drawer, Dropdown, Sidebar } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutSuccess } from '../redux/user/userSlice';

export default function Header() {

  const [isOpen, setIsOpen] = useState(null)
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const handleSignInClick = () => {
    setIsSignUpOpen(false);
    setIsSignInOpen(true);
  };

  const handleSignUpClick = () => {
    setIsSignInOpen(false);
    setIsSignUpOpen(true);
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/auth/signout', {
          method: 'POST'
      });

      const data = await res.json();

      if (res.ok) {
          dispatch(signOutSuccess(data));
      } else {
          console.log(data.message);
      }

    } catch (error) {
      console.log(error.message);
    }
};

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        <div className="text-md sm:text-xl font-bold ">
          <Link to="/">Fashion Fiesta</Link>
        </div>

        <nav className="hidden md:flex space-x-4">
            <NavLink to='/' className={({isActive}) => isActive ? 'text-[#ff008a] font-semibold' : 'hover:text-[#ff008a]'}>Home</NavLink>
            <NavLink to="/collections" className={({isActive}) => isActive ? 'text-[#ff008a] font-semibold' : 'hover:text-[#ff008a]'}>Collections</NavLink>
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
          
          {currentUser ? (
            <Dropdown arrowIcon={true} inline label={ <IoPerson className='text-gray-700 text-xl sm:text-2xl'/> }>
                <Dropdown.Header>
                    <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                </Dropdown.Header>
                {currentUser.isAdmin && (
                        <Link to={'/dashboard'}>
                            <Dropdown.Item icon={MdDashboardCustomize} className='text-blue-500 font-semibold'>
                                Dashboard
                            </Dropdown.Item>
                        </Link>
                    )}
                {currentUser.isAdmin && <Dropdown.Divider />}
                <Dropdown.Item icon={TiDeleteOutline} className='text-red-500 font-semibold'>
                    Delete account
                </Dropdown.Item>
                <Dropdown.Item icon={HiArrowSmRight} className='text-green-500 font-semibold' onClick={handleSignOut}>
                    Sign out
                </Dropdown.Item>
            </Dropdown>
          ) : (
            <>
              <SignIn openModal={isSignInOpen} setOpenModal={setIsSignInOpen} handleSignUpClick={handleSignUpClick} />
              <SignUp openModal={isSignUpOpen} setOpenModal={setIsSignUpOpen} handleSignInClick={handleSignInClick} />
            </>
          )}

        </div>

        {!isOpen && (
          <button onClick={() => setIsOpen(true)} className="md:hidden text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
          </button>
        )}
        
      </div>

      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Header title="Menu" titleIcon={CgMenuGridR}/>
        <Drawer.Items>
          <Sidebar className="[&>div]:bg-transparent [&>div]:p-0">
            <div className="flex h-full flex-col justify-between py-2">
              <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-3'>
                  <NavLink to='/' onClick={() => setIsOpen(false)} className={({isActive}) => isActive ? 'text-[#ff008a] font-semibold' : 'hover:text-[#ff008a]'}>
                      Home
                  </NavLink>
                  <NavLink to='/collections' onClick={() => setIsOpen(false)} className={({isActive}) => isActive ? 'text-[#ff008a] font-semibold' : 'hover:text-[#ff008a]'}>
                      Collections
                  </NavLink>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </header>
  );
}
