import { useEffect, useState } from "react";
import { useCartFavoritesContext } from "../context/CartFavoritesContext";

const useCart = (productId: string) => {
  const [isInCart, setIsInCart] = useState<boolean>();
  const [productQuantity, setProductQuantity] = useState<number>();

  const { setCart } = useCartFavoritesContext();


  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsInCart(false);
    }, 5000);

    return () => clearTimeout(timerId);
  }, []);

  const handleAddToCart = () => {
    const cartItems = localStorage.getItem("cart");
    let cartIds = cartItems ? JSON.parse(cartItems) : [];
    console.log(cartIds);
    if (
      cartIds.some(
        (item: { productId: string }) => item.productId === productId
      )
    ) {
      setIsInCart(true);
    } else {
      cartIds.push({ productId, productQuantity });
      setIsInCart(false);
    }
    console.log("test");
    setCart(cartIds);
    localStorage.setItem("cart", JSON.stringify(cartIds));
  };
  return {
    setIsInCart,
    isInCart,
    handleAddToCart,
    productQuantity,
    setProductQuantity,
  };
};

export default useCart;
