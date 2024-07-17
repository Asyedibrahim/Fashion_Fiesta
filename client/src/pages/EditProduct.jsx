import { FileInput, Select, Textarea, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoIosArrowDown, IoIosCloseCircleOutline } from "react-icons/io";
import ProductPreview from '../components/ProductPreview';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProduct() {

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
    tags: [],
    trending: false,
  });
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [containSize, setContainSize] = useState(false);
  const navigate = useNavigate();
  const { productId } = useParams();
  const [imagePreview, setImagePreview] = useState([]); 
  const [deletedImages, setDeletedImages] = useState([]);

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
    const fetchProduct = async () => {
        try {
            const res = await fetch(`/api/product/getProduct/${productId}`);
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
                return;
            }
            setFormData(data);
            setImagePreview(data.images.map((image) => `http://localhost:3000/${image}`));

        } catch (error) {
            console.log(error.message);
        }
    }

    if (currentUser.isAdmin) {
        fetchCategories();
        fetchSizes();
        fetchProduct();
    }
  }, [productId]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'quantity') {
      const quantity = parseInt(value, 10);
      setFormData({ ...formData, [id]: Math.max(Math.min(quantity, 15), 1) });
      return;
    }
    if (id === 'regularPrice' || id === 'discountPrice') {
      const price = parseInt(value, 10);
      setFormData({ ...formData, [id]: Math.max(Math.min(price, 1000000), 1) });
      return;
    }
    if (id === 'category') {
      const selectedCategory = categories.find(category => category._id === value);
      setContainSize(selectedCategory?.containSize || false);
      setFormData({ ...formData, [id]: selectedCategory?.cname.toLowerCase() || '' });
      return;
    }
    
    setFormData({ ...formData, [id]: value });
  };

  // handleChange for "Tags"
  const handleTagChange = (e) => {
    const newTags = e.target.value.split(',');
    setFormData({ ...formData, tags: newTags });
  };
  const handleTagRemove = (tagToRemove) => {
    const removedTag = formData.tags.filter(tag => tag !== tagToRemove);
    setFormData({ ...formData, tags: removedTag });
  };

  //  handleChange for "Sizes"
  const handleCheckboxChange = (size) => {
    const selectedSizes = formData.sizes.includes(size)
      ? formData.sizes.filter((s) => s !== size)
      : [...formData.sizes, size];
    setFormData({ ...formData, sizes: selectedSizes });
  };

  //  handleChange for "Images"
  const handleFileChange = (e) => {
    const selectedFiles = [...e.target.files];
    const updatedImages = [...formData.images, ...selectedFiles];
    setFormData({ ...formData, images: updatedImages });
  
    const newPreviewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreview([...imagePreview, ...newPreviewUrls]);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.images.length < 1) {
      console.log('You must upload at least one image');
      return;
    }
    if (+formData.discountPrice > +formData.regularPrice) {
      console.log('Discount price must be lower than or equal to regular price');
      return;
    }
  
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'images') {
        formData.images.forEach((file) => formDataObj.append('images', file));
      } else {
        formDataObj.append(key, formData[key]);
      }
    });
    formDataObj.append('deletedImages', JSON.stringify(deletedImages));

    try {
      const res = await fetch(`/api/product/edit/${productId}`, {
        method: 'PUT',
        body: formDataObj,
      });
  
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        return;
      }
      if (res.ok) {
        navigate(`/product/${data._id}`, { replace: true });
        console.log('Product has been edited!', data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const onDeleteImage = (index) => {
    const updatedImagePreview = imagePreview.filter((_, i) => i !== index);
    setImagePreview(updatedImagePreview);

    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: updatedImages,
    });

    setDeletedImages([...deletedImages, formData.images[index]]);
  };

  return (
    <div className="max-w-6xl mx-auto p-3">
      <h1 className="text-3xl mb-6 flex gap-2"><span className='text-[#ff008a]'>Edit</span>Product</h1>
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
                    <Select id="category" onChange={handleChange} className='w-full' defaultValue={formData.category === 'men'}>
                        <option value=''>Select Category</option>
                        {categories && categories.map((category) => (
                            <option key={category._id} value={category._id}>{category.cname}</option>
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
            
              {containSize && (
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
              )}
            

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
                rows='5'
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Tags <span className='text-xs text-gray-600'>( Separate using , )</span></label>
              <div className="flex flex-wrap gap-1">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="rounded-full px-2 py-1 bg-gray-200 text-gray-700 mr-1 mb-1 flex items-center">
                    {tag}
                    <button
                      type="button"
                      className="ml-2 p-0 text-gray-400 hover:text-red-500 focus:outline-none"
                      onClick={() => handleTagRemove(tag)}>
                      <IoIosCloseCircleOutline size={18} />
                    </button>
                  </div>
                ))}
                <Textarea
                  id="tags"
                  value={formData.tags.join(',')} // Join tags with comma for input value
                  onChange={handleTagChange}
                  className="mt-1 w-full rounded-md shadow-sm"
                  required
                  rows='2'
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Images</label>
              <FileInput
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="mt-1 w-full rounded-md border"
                helperText="PNG, JPG or JPEG (MAX : 1MB)."
              />
            </div>
            
            <div className="mb-4 mt-10 flex items-center gap-2">
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
              <button type="button" className="border-2 border-red-600 bg-red-600 hover:bg-red-700 text-white p-2 px-4 rounded-md shadow-sm ">
                Cancel
              </button>
              <button type="submit" className="bg-[#ff008a] border-2 border-[#ff008a] hover:bg-[#f83ca0] text-white p-2 px-4 rounded-md shadow-sm ">
                Edit product
              </button>
            </div>

          </form>
        </div>

        <ProductPreview formData={formData} containSize={containSize} images={imagePreview} onDeleteImage={onDeleteImage}/>
      </div>
    </div>
  );
}
