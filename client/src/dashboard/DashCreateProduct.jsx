import { Spinner, Table, TextInput } from 'flowbite-react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashCreateProduct() {

  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  return (
    <div className='max-w-4xl w-full p-3'>
    <h1 className='text-3xl mt-5'>Product</h1>

    <div className='mt-10 flex justify-between gap-3'>
      <TextInput id='search' placeholder='Search products..' className='w-96'/>
      
        <Link to='/create-product' className='bg-[#ff008a] hover:bg-[#ff319f] text-white py-[10px] px-3 text-sm font-semibold rounded-md whitespace-nowrap' >
          Create +
        </Link>
    </div>


      <div className='table-auto mt-10 overflow-x-scroll shadow-md scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300'>
      {loading ? <p className='text-3xl my-52 justify-center flex gap-2 items-center'>Loading...<Spinner size='lg' color='pink'/></p> : 
      currentUser.isAdmin && !loading ? (
        <>
          <Table hoverable className='shadow-md w-full'>
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Has Size</Table.HeadCell>
              <Table.HeadCell colSpan='2' align='center'>Actions</Table.HeadCell>
            </Table.Head>
            {/* {categories.map((category) => ( */}
              <Table.Body className='divide-y' >
                <Table.Row className='bg-white' >
                  <Table.Cell>25/04/2002</Table.Cell>
                  <Table.Cell className='font-medium text-gray-900'>White House</Table.Cell>
                  <Table.Cell>yes</Table.Cell>
                  <Table.Cell className='text-teal-500 font-medium hover:underline cursor-pointer'>
                    Edit
                  </Table.Cell>
                  <Table.Cell>
                    <span className='text-red-500 font-medium hover:underline cursor-pointer' 
                    >Delete</span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            {/* ))} */}
              
          </Table>
        </>
      ) : (
        <p>You have no product yet!</p>
      )}
    </div>
  </div>
  )
}
