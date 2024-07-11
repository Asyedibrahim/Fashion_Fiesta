
export default function ProductPreview({ formData, containSize }) {
  return (
    <div className='mt-4 sm:mt-0'>
        <div className='flex items-center gap-4 justify-between mb-4'>
            <h2 className="text-2xl">Product <span className='text-[#ff008a]'>Preview</span> </h2>
        </div>

        <div className=" rounded-md p-4 border border-gray-300">
            <h3 className="text-xl mb-2">{formData.name || 'Product Name'}</h3>
            <p className="text-gray-700 mb-2 capitalize"><span className='text-black font-[500]'>Category:</span> {formData.category || 'Category'}</p>
            {containSize && (<p className="text-gray-700 mb-2 uppercase"><span className='text-black font-[500] capitalize'>Size:</span> {formData.sizes.join(', ') || 'Size'}</p> )}
            <p className="text-gray-700 mb-2"><span className='text-black font-[500]'>Quantity:</span> {formData.quantity || 'Quantity'}</p>
            <p className="text-gray-700 mb-2"><span className='text-black font-[500]'>Regular Price:</span> Rs.{formData.regularPrice || '0.00'}</p>
            <p className="text-gray-700 mb-2"><span className='text-black font-[500]'>Discount Price:</span> Rs.{formData.discountPrice || '0.00'}</p>
            <p className="text-gray-700 mb-2"><span className='text-black font-[500]'>Vendor:</span> {formData.vendor || 'Vendor'}</p>
            <p className="text-gray-700 mb-2 line-clamp-2"><span className='text-black font-[500]'>Description:</span> {formData.description || 'Description'}</p>
            <p className="text-gray-700 mb-2"><span className='text-black font-[500]'>Trending:</span> {formData.trending ? 'Yes' : 'No'}</p>
            <div className="mt-4">
                <h4 className="text-lg mb-2"><span className='text-black font-[500]'>Images:</span></h4>
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
                    : <p className='whitespace-nowrap'>No images uploaded !</p>}
                </div>
            </div>
        </div>
    </div>
  )
}
