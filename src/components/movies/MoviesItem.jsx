import React, { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

const MovieItem = ({ title, poster_path, id, price, bg }) => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // Wishlist qo'shish yoki o'chirish
  const handleLike = () => {
    if (wishlist.includes(id)) {
      setWishlist((prev) => prev.filter((item) => item !== id));
    } else {
      setWishlist((prev) => [...prev, id]);
    }
  };

  // Cartga mahsulot qo'shish
  const handleAddToCart = () => {
    const isExist = cart.find((item) => item.id === id);
    if (!isExist) {
      const newCart = [...cart, { id, title, price, poster_path }];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart)); // localStorage'ga saqlash
    }
  };

  // Wishlistni saqlash
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg p-4 flex flex-col items-center ${
        bg ? "dark:bg-gray-900" : "dark:bg-black"
      }`}
    >
      <img
        onClick={() => navigate(`/product/${id}`)}
        src={`${import.meta.env.VITE_IMAGE_URL}${poster_path}`}
        alt={title}
        className="w-full h-[400px] object-cover rounded-md mb-4 cursor-pointer"
      />
      <div className="flex items-center justify-between w-full">
        <button
          onClick={handleLike}
          className="text-2xl text-gray-600 hover:text-red-500 transition-colors duration-200"
        >
          {wishlist.includes(id) ? <FaHeart /> : <FaRegHeart />}
        </button>
        <button
          onClick={handleAddToCart}
          className="text-2xl text-gray-600 hover:text-blue-500 transition-colors duration-200"
        >
          <IoCartOutline />
        </button>
      </div>
      <h2
        className={`font-medium text-[20px] text-black text-center mb-2 line-clamp-2 ${
          bg ? "dark:text-gray-300" : "text-gray-900 dark:text-gray-300"
        }`}
      >
        {title}
      </h2>
      <p className="text-lg font-bold text-gray-700">${price}</p>
    </div>
  );
};

export default memo(MovieItem);
