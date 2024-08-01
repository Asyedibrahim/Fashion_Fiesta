import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Carousel } from "flowbite-react";
import { IoStar, IoShareSocial } from 'react-icons/io5';
import { FaCartPlus, FaRegHeart } from 'react-icons/fa';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function Product() {

  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/getProduct/${productId}`);
        const data = await res.json();

        if (res.ok) {
          setProduct(data);
          if (data.images) {
            setMainImage(data.images[0]);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchProduct();
  }, [productId]);

  // const destroyOwlCarousel = (selector) => {
  //   const carousel = $(selector);
  //   if (carousel.data('owl.carousel')) {
  //     carousel.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
  //     carousel.find('.owl-stage-outer').children().unwrap();
  //   }
  // };

  // useEffect(() => {
  //   if (product && product.images) {
  //     const sliderCarousel = $('.slider-carousel').owlCarousel({
  //       loop: true,
  //       autoplay: true,
  //       autoplayTimeout: 2000,
  //       autoplayHoverPause: true,
  //       margin: 5,
  //       nav: false,
  //       responsive: {
  //         0: { items: 1 },
  //         600: { items: 1 },
  //         1000: { items: 1 },
  //       },
  //     });

  //     return () => {
  //       destroyOwlCarousel('.slider-carousel');
  //     };
  //   }
  // }, [setProduct]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this product: ${product.name}`,
        url: window.location.href, // current page URL
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      console.log('Web Share API not supported in this browser.');
      alert("Your browser doesn't support the native sharing feature. You can copy the link manually.");
    }
  };

  if (!product) return <div></div>;

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-2xl font-semibold pb-2 border-b">Product Details</h1>
      <div className="mt-5 overflow-hidden flex flex-col md:flex-row gap-5">

        {/* Small device image */}
        <div className="sm:hidden w-[20rem] h-[28rem] rounded-md mx-auto md:mx-0">
          <OwlCarousel 
            className="slider-carousel owl-theme "
            loop
            margin={5}
            autoplay
            autoplayTimeout={10000}
            items={1}>
              {product.images && product.images.map((image, index) => (
                <img src={image} key={index} alt={product.name} className='object-cover w-full h-full rounded-md mx-auto' />
              ))}
          </OwlCarousel>
        </div>
          

        {/* Large device image */}
        <div className="hidden sm:flex md:flex-1 lg:flex-none flex-col sm:flex-row md:flex-col gap-2 w-full lg:w-96 sm:h-[30rem] sm:ml-9 md:ml-0 md:h-full ">
          <div className="relative">
              <img src={mainImage} alt='' className="w-full sm:h-[30rem] lg:w-[25rem] md:h-full sm:order-2 md:order-1 "/>
              {product.trending && (
                  <span className="bg-orange-500 text-white font-semibold rounded-2xl text-center text-xs absolute px-2 py-1 start-3 top-3 z-10">HOT</span>
              )}
          </div>
          <div className="flex sm:flex-col md:flex-row gap-1 overflow-x-auto sm:order-1 md:order-2 custom-scrollbar">
              {product.images && product.images.map((image, index) => (
                  <img src={image} alt="product images" key={index} className="w-16 sm:w-32 lg:w-20" onClick={() => setMainImage(image)}/>
              ))}
          </div>
        </div>

        <div className="flex-1 max-w-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-700 line-clamp-2">{product.name}</h3>
            <div className="flex gap-3 text-2xl">
              <FaRegHeart className="hover:text-rose-600 cursor-pointer"/>
              <IoShareSocial className="cursor-pointer" onClick={handleShare}/>
            </div>
          </div>
          {product.discountPrice ? (
              <div className="text-xl mt-5 flex gap-3 items-center font-semibold no-select">
                  <p className="text-lg text-red-600 line-through mt-1">Rs. {product.regularPrice}</p>
                  <p>Rs. {product.discountPrice}</p>
              </div>
          ) : <p className="text-xl mt-7 font-semibold no-select">Rs. {product.regularPrice}</p>}

          <div className="flex gap-1 items-center mt-3 no-select">
              <span className="text-yellow-300 text-lg"><IoStar /></span>
              <span className="text-yellow-300 text-lg"><IoStar /></span>
              <span className="text-yellow-300 text-lg"><IoStar /></span>
              <span className="text-yellow-300 text-lg"><IoStar /></span>
              <span className="text-slate-500 text-lg"><IoStar /></span>
              <span>( {product.productRating} reviews)</span>
          </div>
          
          <div className="flex flex-col gap-3 mt-7 w-48 no-select">
            <span className="p-2 border bg-[#ff008a] text-white font-semibold rounded-md cursor-pointer hover:bg-[#ff329f] flex items-center justify-center gap-1" ><FaCartPlus />Add to Cart</span>
          </div>

          <div className="mt-5">
            <span className="font-semibold text-black">Description : </span>
            <p className={`text-slate-500 ${showFullDescription ? '' : 'line-clamp-6'}`}>{product.description}</p>
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-[#ff008a] hover:underline mt-2 text-sm no-select">
              {showFullDescription ? 'Show less' : 'Show more'}
            </button>
          </div>
        </div>

      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Product Reviews</h2>
        <div className="border p-4 rounded-lg">
          <p>No reviews yet. Be the first to review!</p>
        </div>
      </div>
      
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Similar Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <img src={product.images[0]} alt="Similar Product" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Product Name</h3>
              <p className="text-gray-700">$19.99</p>
            </div>
          </Card>
          <Card>
            <img src={product.images[0]} alt="Similar Product" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Product Name</h3>
              <p className="text-gray-700">$19.99</p>
            </div>
          </Card>
          <Card>
            <img src={product.images[0]} alt="Similar Product" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Product Name</h3>
              <p className="text-gray-700">$19.99</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
