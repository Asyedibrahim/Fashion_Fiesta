import { FileInput, Select, Textarea, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TiArrowBack } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";

export default function CreateProduct() {

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    sizes: [],
    quantity: 1,
    regularPrice: 10,
    discountPrice: 0,
    vendor: '',
    images: [],
    description: '',
    trending: false,
  });
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/category/getCategories');
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
                return;
            }
            setCategories(data);

        } catch (error) {
            console.log(error.message);
        }
    }
    const fetchSizes = async () => {
        try {
            const res = await fetch('/api/size/getSizes');
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
                return;
            }
            setSizes(data.sizes);

        } catch (error) {
            console.log(error.message);
        }
    }

    if (currentUser.isAdmin) {
        fetchCategories();
        fetchSizes();
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'quantity') {
      const quantity = parseInt(value, 10);
      setFormData({
        ...formData,
        [id]: Math.max(Math.min(quantity, 15), 1),
      });
      return;
    }
    if (id === 'regularPrice' || id === 'discountPrice') {
      const price = parseInt(value, 10);
      setFormData({
        ...formData,
        [id]: Math.max(Math.min(price, 1000000), 1),
      });
      return;
    }
    
    setFormData({ ...formData, [id]: value });
  };

  const handleCheckboxChange = (size) => {
    const selectedSizes = formData.sizes.includes(size)
      ? formData.sizes.filter((s) => s !== size)
      : [...formData.sizes, size];
    setFormData({ ...formData, sizes: selectedSizes });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-6xl mx-auto p-3">
      <h1 className="text-3xl mb-6 flex gap-2"><span className='text-[#ff008a]'>Create</span>Product</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">Name</label>
                <div className='flex gap-4 items-center'>
                    <TextInput
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="rounded-md shadow-sm w-full"
                        required
                    />
                    <Select onChange={(e) => setFormData({ ...formData, category: e.target.value})} className='w-full'>
                        <option value=''>Select Category</option>
                        {categories && categories.map((category) => (
                            <option key={category._id} value={category.cname.toLowerCase()}>{category.cname}</option>
                        ))}
                    </Select>
                </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Vendor</label>
              <TextInput
                type="text"
                id="vendor"
                value={formData.vendor}
                onChange={handleChange}
                className="mt-1 w-full rounded-md shadow-sm"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Size</label>
              <div className="relative">
                <div className="relative">
                  <button
                    type="button"
                    className="w-full p-2 text-left bg-gray-50 border border-gray-300 rounded-md shadow-sm relative"
                    onClick={() => setFormData({ ...formData, showDropdown: !formData.showDropdown })}>
                    {formData.sizes.length > 0 ? formData.sizes.join(', ') : <span className='text-sm'>Select Sizes</span>}
                    <i className='absolute end-3 top-3'><IoIosArrowDown /></i>
                  </button>
                  {formData.showDropdown && (
                    <div className="absolute max-h-60 overflow-x-auto z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                      {sizes.map((size) => (
                        <label key={size._id} className="flex items-center p-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.sizes.includes(size.sname)}
                            onChange={() => handleCheckboxChange(size.sname)}
                            className="mr-2 text-[#ff008a] focus:ring-[#ff008a]"
                          />
                          {size.sname.toUpperCase()}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='flex flex-wrap md:justify-between gap-5 items-center mb-4'>
              <div>
                <label className="text-sm font-medium text-gray-700">Quantity</label>
                <TextInput
                  type="number"
                  id="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="mt-1 w-32 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Regular Price</label>
                <TextInput
                  type="number"
                  id="regularPrice"
                  value={formData.regularPrice}
                  onChange={handleChange}
                  className="mt-1 w-32 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Discount Price</label>
                <TextInput
                  type="number"
                  id="discountPrice"
                  value={formData.discountPrice}
                  onChange={handleChange}
                  className="mt-1 w-32 rounded-md shadow-sm"
                  required
                  min='0'
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 w-full rounded-md shadow-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Images</label>
              <FileInput
                type="file"
                id="images"
                multiple
                onChange={handleFileChange}
                className="mt-1 w-full rounded-md shadow-sm border"
                required
                helperText="PNG, JPG or JPEG (MAX : 1MB)."
              />
            </div>
            
            <div className="mb-4 flex items-center gap-2">
              <label className="font-medium text-gray-700">Trending : </label>
              <input
                type="checkbox"
                id="trending"
                checked={formData.trending}
                onChange={() => setFormData({ ...formData, trending: !formData.trending })}
                className="mr-2 text-[#ff008a] focus:ring-[#ff008a] w-5 h-5"
              />
            </div>
            
            <div className='flex flex-wrap gap-5 items-center mt-5'>
              <button type="submit" className="border-2 border-red-600 bg-red-600 hover:bg-red-700 text-white p-2 px-4 rounded-md shadow-sm ">
                Cancel
              </button>
              <button type="submit" className="border-2 border-[#ff008a] hover:bg-[#ff008a] hover:text-white text-[#ff008a] p-2 px-4 rounded-md shadow-sm ">
                Save and Exit
              </button>
              <button type="submit" className="bg-[#ff008a] border-2 border-[#ff008a] hover:bg-[#f83ca0] text-white p-2 px-4 rounded-md shadow-sm ">
                Save and Next
              </button>
            </div>

          </form>
        </div>

        <div className='mt-4 sm:mt-0'>
          <div className='flex items-center gap-4 justify-between mb-4'>
            <h2 className="text-2xl">Product <span className='text-[#ff008a]'>Preview</span> </h2>
            
          </div>
          <div className=" rounded-md p-4 border border-gray-300 ">
            <h3 className="text-xl mb-2">{formData.name || 'Product Name'}</h3>
            <p className="text-gray-700 mb-2 capitalize"><span className='text-black'>Category:</span> {formData.category || 'Category'}</p>
            <p className="text-gray-700 mb-2 uppercase"><span className='text-black capitalize'>Size:</span> {formData.sizes.join(', ') || 'Size'}</p>
            <p className="text-gray-700 mb-2">Quantity: {formData.quantity || 'Quantity'}</p>
            <p className="text-gray-700 mb-2">Regular Price: Rs.{formData.regularPrice || '0.00'}</p>
            <p className="text-gray-700 mb-2">Discount Price: Rs.{formData.discountPrice || '0.00'}</p>
            <p className="text-gray-700 mb-2">Vendor: {formData.vendor || 'Vendor'}</p>
            <p className="text-gray-700 mb-2 line-clamp-2">Description: {formData.description || 'Description'}</p>
            <p className="text-gray-700 mb-2">Trending: {formData.trending ? 'Yes' : 'No'}</p>
            <div className="mt-4">
              <h4 className="text-lg mb-2">Images:</h4>
              <div className="grid grid-cols-3 gap-2">
                {formData.images.length > 0
                  ? formData.images.map((image, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`product-${index}`}
                        className=" rounded-md"
                      />
                    ))
                  : 'No images uploaded'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
