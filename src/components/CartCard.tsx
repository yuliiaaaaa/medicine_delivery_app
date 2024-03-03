import React from "react";
import { OrderItem } from "../types/OrderItems";

type Props = {
  cartItem: OrderItem
  setCartItems: (item: OrderItem[]) => void;
  cartItems:OrderItem[];
};
export const CartCard: React.FC<Props> = ({
  cartItem,
  setCartItems,
  cartItems,
}) => {

    const cardPrice= cartItem.price * cartItem.quantity;

  const handleDelete = () => {
    const filteredItems = cartItems.filter((item) => item.id !== cartItem.id);

    setCartItems(filteredItems);
  };

  const isDisabledMinusButton = cartItem.quantity <= 1;
  const handlePlus = () => {
    const updatedCartItems = cartItems.map((el) => {
      if (el.id === cartItem.id) {
        const newQuantity = cartItem.quantity + 1;
        const newSubtotal = newQuantity * cartItem.price;
        return { ...el, quantity: newQuantity, subtotal: newSubtotal };
      }

      return el;
    });

    setCartItems(updatedCartItems);
  };

  const handleMinus = () => {
    const updatedCartItems = cartItems.map((el) => {
      if (el.id === cartItem.id) {
        const newQuantity = cartItem.quantity - 1;
      const newSubtotal = newQuantity * cartItem.price;
      return { ...el, quantity: newQuantity, subtotal: newSubtotal };
      }

      return el;
    });

    setCartItems(updatedCartItems);
  };

  return (
    <div className="cart-card">
      <div className="cart-card__left">
        <div
          data-cy="cartDeleteButton"
          className="icon icon--close cart-card__icon"
          onClick={handleDelete}
        />
        <img
          src=
          {cartItem.image_url}
          alt="product"
          className="cart-card__img"
        />
        <p className="cart-card__name">
            {cartItem.medicine_name}
            </p>
      </div>

      <div className="cart-card__right">
        <div className="cart-card__quantity-control">
          <button
            className="button"
            aria-label="button-slider-left"
            type="button"
            disabled={isDisabledMinusButton}
            onClick={handleMinus}
          >
            -
          </button>

          <p data-cy="productQauntity" className="cart-card__quantity">
            {cartItem.quantity}
          </p>

          <button
            className="button"
            aria-label="button-slider-right"
            type="button"
            onClick={handlePlus}
          >
            +
          </button>
        </div>
        <p className="cart-card__price">{`$${cardPrice}`}</p>
      </div>
    </div>
  );
};
