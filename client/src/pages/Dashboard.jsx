import { useEffect, useState } from 'react';
import DashSidebar from '../dashboard/DashSidebar';
import { useLocation } from 'react-router-dom';
import DashCreateProduct from '../dashboard/DashCreateProduct';
import DashCategory from '../dashboard/DashCategory';
import DashSize from '../dashboard/DashSize';
import SmSideBar from '../dashboard/SmSideBar';

export default function Dashboard() {

  const location = useLocation();
  const [tab, setTab] = useState('');
    
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');

    if ( tabFromUrl ) {
      setTab(tabFromUrl);
    } else {
      setTab('createProduct')
    }

  }, [location.search])

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>

      <div className="md:w-56 mt-1 hidden md:inline">
        {/* Sidebar Starts */}
        <DashSidebar />
      </div>

      <div className="md:hidden">
        {/* Sidebar Starts */}
        <SmSideBar />
      </div>

      {/* Create Product... */}
      {tab === 'createProduct' && <DashCreateProduct />}
      {/* Create Categoery... */}
      {tab === 'createCategory' && <DashCategory />}
      {/* Create Product... */}
      {tab === 'createSize' && <DashSize />}

    </div>
  )
}
