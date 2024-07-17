import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Carousel, Badge, Button, Rating } from "flowbite-react";

export default function Product() {

  const { productId } = useParams();
  const [product, setProducts] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/getProduct/${productId}`);
        const data = await res.json();

        if (res.ok) {
          setProducts(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchProduct();
  }, [productId])

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Carousel className="w-[20rem] h-[26rem] rounded-md mx-auto md:mx-0" indicators={false}>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:3000/${image}`}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            ))}
          </Carousel>

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-2">{product.vendor}</p>
          <Badge color="success">{product.category}</Badge>
          
          <div className="my-4">
            <span className="text-2xl font-bold text-[#ff008a]">${product.regularPrice}</span>
            {product.discountPrice > 0 && (
              <span className="ml-4 text-xl text-gray-500 line-through">
                ${product.discountPrice}
              </span>
            )}
          </div>

          <div className="flex items-center my-2">
            <Rating>
              {Array(5).fill(0).map((_, index) => (
                <Rating.Star key={index} filled={index < product.productRating} />
              ))}
            </Rating>
            <span className="ml-2 text-gray-600">(10 Reviews)</span>
          </div>

          <p className="mt-4">{product.description}</p>
          <div className="my-6">
            <h2 className="text-lg font-semibold mb-2">Sizes:</h2>
            <div className="flex gap-2">
              {product.sizes.map((size, index) => (
                <Badge key={index} color="info">{size.toUpperCase()}</Badge>
              ))}
            </div>
          </div>

          <Button color="success" className="mt-4 w-full">
            Add to Cart
          </Button>
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
            <img src="https://via.placeholder.com/150" alt="Similar Product" />
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
