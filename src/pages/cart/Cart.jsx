import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleDelete = (indexToDelete) => {
    const updatedCart = cart.filter((_, index) => index !== indexToDelete);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Yangi savatni saqlab qo'yish
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-center text-5xl font-bold mb-8">Your Cart</h2>
      {cart.length > 0 ? (
        <div>
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-4 border rounded"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={`${import.meta.env.VITE_IMAGE_URL}${item.poster_path}`}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <h3 className="text-3xl font-bold text-center">All Movies:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg shadow-md bg-white text-center"
                >
                  <img
                    src={`${import.meta.env.VITE_IMAGE_URL}${item.poster_path}`}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <h4 className="font-semibold text-lg">{item.title}</h4>
                  <p className="text-gray-700 mt-2">${item.price}</p>
                  <button
                    onClick={() => handleDelete(index)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty!</p>
      )}
    </div>
  );
};

export default CartPage;
