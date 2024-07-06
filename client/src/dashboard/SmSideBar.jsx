import { Drawer, Sidebar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiArrowSmRight, HiShoppingBag } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
import { CgMenuGridR } from "react-icons/cg";

export default function SmSideBar() {

    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [tab, setTab] = useState('');

    const handleClose = () => setIsOpen(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if ( tabFromUrl ) {
            setTab(tabFromUrl);
        }
    }, [location.search])

  return (
    <>
      <div className="p-4">
        <button onClick={() => setIsOpen(true)} color='light'><CgMenuGridR className='text-3xl'/></button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar>
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <Sidebar.Items>
                    <Sidebar.ItemGroup className='flex flex-col gap-1'>

                        <Sidebar.Collapse icon={HiShoppingBag} label="Manage Store">
                            <Link to={'/dashboard?tab=createProduct'}>
                                <Sidebar.Item active={tab === 'createProduct'} as='div' onClick={handleClose} className={`${tab === 'createProduct' && 'text-[#ff008a] font-semibold bg-gray-50'}`}>Products</Sidebar.Item>
                            </Link>
                            <Link to={'/dashboard?tab=createCategory'}>
                                <Sidebar.Item active={tab === 'createCategory'} as='div' onClick={handleClose} className={`${tab === 'createCategory' && 'text-[#ff008a] font-semibold bg-gray-50'}`}>Category</Sidebar.Item>
                            </Link>
                            <Link to={'/dashboard?tab=createSize'}>
                                <Sidebar.Item active={tab === 'createSize'} as='div' onClick={handleClose} className={`${tab === 'createSize' && 'text-[#ff008a] font-semibold bg-gray-50'}`}>Size</Sidebar.Item>
                            </Link>
                        </Sidebar.Collapse>

                        <Sidebar.Item href="#" icon={HiArrowSmRight}>
                        Log out
                        </Sidebar.Item>

                    </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  )
}
