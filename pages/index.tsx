import React from "react";

type Product = {
  hotel_id: number;
  hotel_name: string;
  min_total_price: number;
  main_photo_url?: string;
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();
  // Adjust this based on the actual API response structure
  const products = data.result || [];
  return { props: { products } };
}

export default function HomePage({ products }: { products: Product[] }) {
  console.log("test");
  console.log(products);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Available Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.hotel_id}
              className="border rounded-lg p-4 shadow"
            >
              {product.main_photo_url && (
                <img
                  src={product.main_photo_url}
                  alt={product.hotel_name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}
              <h2 className="text-lg font-semibold">{product.hotel_name}</h2>
              <p className="text-gray-700">${product.min_total_price}</p>
              <a
                href={`/booking?id=${product.hotel_id}`}
                className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded"
              >
                Book Now
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
