import { Pagination, Spinner, Table, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

export default function DashSize() {

  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ size: "", id:"" });
  const [sizes, setSizes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalSizes, setTotalSizes] = useState(0);
  const focusRef = useRef();

  const onPageChange = (page) => {
    setCurrentPage(page);
    fetchSizes(page);
  };

  const fetchSizes = async ( page = 1 ) => {
    const res = await fetch(`/api/size/getSizes?page=${page}&limit=5`);
    const data = await res.json();

    if (res.ok) {
      setSizes(data.sizes);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalSizes(data.totalSizes);
      setLoading(false);
    };
  };

  useEffect(() => {
    if (currentUser.isAdmin) {
      fetchSizes();
    };

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(formData.id ? `/api/size/editSize/${formData.id}` : '/api/size/createSize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        return;
      };
      if (res.ok) {
        setFormData({ size: "", id: "" });
        fetchSizes();
        console.log(formData.id ? 'Updated' : 'Created');
      };

    } catch (error) {
      console.log(error.message);
    };
  };

  const handleDelete = async (sizeId) => {
    try {
      const res = await fetch(`/api/size/deleteSize/${sizeId}`, {
        method: 'DELETE'
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setFormData({ size: "", id: "" })
        setSizes((prev) => prev.filter((size)  => size._id !== sizeId));
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = (sizeId, sizeName) => {
    setFormData({ 
      id: sizeId,
      size: sizeName,
    })
  }

  return (
  <div className='max-w-4xl w-full p-3'>
    <h1 className='text-3xl mt-5'>Size</h1>

    <form className='mt-10 flex gap-3' onSubmit={handleSubmit}>
      <TextInput id='size' placeholder="Eg. xl or 8" value={formData.size} ref={focusRef} className='w-96' onChange={(e) => setFormData({...formData, [e.target.id]: e.target.value.toLowerCase()})} autoComplete='off' />

      <button className='bg-[#ff008a] hover:bg-[#ff319f] text-white px-3 rounded-md text-sm font-semibold' type='submit' >{formData.id ? 'Update' : 'Create'}</button>
    </form>


      <div className='table-auto mt-10 overflow-x-scroll shadow-md scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300'>
      {loading ? <p className='text-3xl my-52 justify-center flex gap-2 items-center'>Loading...<Spinner size='lg' color='pink'/></p> : 
      currentUser.isAdmin && sizes.length > 0 && !loading ? (
        <>
          <Table hoverable className='shadow-md w-full'>
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell colSpan='2' align='center'>Actions</Table.HeadCell>
            </Table.Head>
            {sizes.map((size) => (
              <Table.Body className='divide-y' key={size._id}>
                <Table.Row className='bg-white' >
                  <Table.Cell>{new Date(size.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell className='font-medium text-gray-900 uppercase'>{size.sname}</Table.Cell>
                  <Table.Cell className='text-teal-500 font-medium hover:underline cursor-pointer' onClick={() => {handleEdit(size._id, size.sname); focusRef.current.focus()}} >
                    Edit
                  </Table.Cell>
                  <Table.Cell>
                    <span className='text-red-500 font-medium hover:underline cursor-pointer' 
                    onClick={() => handleDelete(size._id)}>Delete</span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
              
          </Table>
        </>
      ) : (
        <p>You have no size yet!</p>
      )}
    </div>
    <div className="flex overflow-x-auto sm:justify-center mt-5 ">
    {totalPages > 0 && (
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
    )}
    </div>
  </div>
  )
}
