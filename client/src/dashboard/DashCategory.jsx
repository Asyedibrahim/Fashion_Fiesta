import { Select, Spinner, Table, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function DashCategory() {

  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ 
    cname: "", 
    containSize: true, 
    id:"" 
  });
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await fetch('/api/category/getCategories');
    const data = await res.json();

    if (res.ok) {
      setCategories(data);
      setLoading(false);
    };
  };

  useEffect(() => {
    if (currentUser.isAdmin) {
      fetchCategories();
    };

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(formData.id ? `/api/category/editCategory/${formData.id}` : '/api/category/createCategory', {
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
        setFormData({ cname: "", containSize: true, id: "" });
        fetchCategories();
        console.log(formData.id ? 'Updated' : 'Created');
      };

    } catch (error) {
      console.log(error.message);
    };
  };

  const handleDelete = async (categoryId) => {
    try {
      const res = await fetch(`/api/category/deleteCategory/${categoryId}`, {
        method: 'DELETE'
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setFormData({ cname: "", containSize: true, id: "" })
        setCategories((prev) => prev.filter((category)  => category._id !== categoryId));
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = (categoryId, categoryName, containSize) => {
    setFormData({ 
      id: categoryId,
      cname: categoryName,
      containSize
    })
  }

  return (
  <div className='max-w-4xl w-full p-3'>
    <h1 className='text-3xl mt-5'>Category</h1>

    <div className='mt-10 flex gap-3'>
        <TextInput id='cname' placeholder="Eg. Men" value={formData.cname} className='w-96' onChange={(e) => setFormData({...formData, [e.target.id]: e.target.value})} autoComplete='off'/>

        <Select id="containSize" value={formData.containSize} onChange={(e) => setFormData({ ...formData, containSize: e.target.value === "true" })}>
          <option value={true}>Category has Size</option>
          <option value={false}>Don't have size</option>
        </Select>
      </div>

      <button className='bg-[#ff008a] hover:bg-[#ff319f] text-white py-2 mt-3 px-3 rounded-md text-sm font-semibold' type='submit' onClick={handleSubmit}>{formData.id ? 'Update' : 'Create'}</button>

      <div className='table-auto mt-10 overflow-x-scroll shadow-md scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300'>
      {loading ? <p className='text-3xl my-52 justify-center flex gap-2 items-center'>Loading...<Spinner size='lg' color='pink'/></p> : 
      currentUser.isAdmin && categories.length > 0 && !loading ? (
        <>
          <Table hoverable className='shadow-md w-full'>
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Has Size</Table.HeadCell>
              <Table.HeadCell colSpan='2' align='center'>Actions</Table.HeadCell>
            </Table.Head>
            {categories.map((category) => (
              <Table.Body className='divide-y' key={category._id}>
                <Table.Row className='bg-white' >
                  <Table.Cell>{new Date(category.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell className='font-medium text-gray-900'>{category.cname}</Table.Cell>
                  <Table.Cell>{category.containSize ? <span className='text-green-500'>Yes</span> : <span className='text-red-500'>No</span>}</Table.Cell>
                  <Table.Cell className='text-teal-500 font-medium hover:underline cursor-pointer' onClick={() => handleEdit(category._id, category.cname, category.containSize)}>
                    Edit
                  </Table.Cell>
                  <Table.Cell>
                    <span className='text-red-500 font-medium hover:underline cursor-pointer' 
                    onClick={() => handleDelete(category._id)}>Delete</span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
              
          </Table>
        </>
      ) : (
        <p>You have no category yet!</p>
      )}
    </div>
  </div>
  )
}
