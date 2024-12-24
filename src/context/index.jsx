import { useContext, createContext, useState, useEffect } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [auth, setAuth] = useState(null); 
  const [count, setCount] = useState(1);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Context.Provider
      value={{
        wishlist,
        setWishlist,
        cart,
        setCart,
        auth,
        setAuth,
        count,
        setCount,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateValue = () => useContext(Context);
