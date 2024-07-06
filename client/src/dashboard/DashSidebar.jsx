import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiShoppingBag } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

export default function DashSidebar() {

    const location = useLocation();
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if ( tabFromUrl ) {
            setTab(tabFromUrl);
        }
    }, [location.search])


  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>

            <Sidebar.Collapse icon={HiShoppingBag} label="Manage Store">
                <Link to={'/dashboard?tab=createProduct'}>
                    <Sidebar.Item active={tab === 'createProduct'} as='div' className={`${tab === 'createProduct' && 'text-[#ff008a] font-semibold bg-gray-50'}`}>Products</Sidebar.Item>
                </Link>
                <Link to={'/dashboard?tab=createCategory'}>
                    <Sidebar.Item active={tab === 'createCategory'} as='div' className={`${tab === 'createCategory' && 'text-[#ff008a] font-semibold bg-gray-50'}`}>Category</Sidebar.Item>
                </Link>
                <Link to={'/dashboard?tab=createSize'}>
                    <Sidebar.Item active={tab === 'createSize'} as='div' className={`${tab === 'createSize' && 'text-[#ff008a] font-semibold bg-gray-50'}`}>Size</Sidebar.Item>
                </Link>
            </Sidebar.Collapse>

          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Log out
          </Sidebar.Item>

        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
