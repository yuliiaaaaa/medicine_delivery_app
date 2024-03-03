import React from "react";
import cn from "classnames";
import { Medicine } from "../types/Medicine";
import { OrderItem } from "../types/OrderItems";

type Props = {
  medicine: Medicine;
  cartItems: OrderItem[];
  setCartItems: (order: OrderItem[]) => void;
  favourites: Medicine[];
  setFavourites: (fav: Medicine[]) => void;
};
export const MedicineCard: React.FC<Props> = ({
  medicine,
  cartItems,
  setCartItems,
  favourites,
  setFavourites,
}) => {
  const isFavourite = favourites.find((el) => el.id === medicine.id);
  const isAdded = cartItems.some((item) => item.id === medicine.id);
  const addToCart = (medicineId: number) => {
    const existingCartItem = cartItems.find(
      (item) => item.medicine_id === medicineId
    );
    if (existingCartItem) {
      setCartItems(
        cartItems.map((item) =>
          item.medicine_id === medicineId
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price,
              }
            : item
        )
      );
    } else {
      const newCartItem: OrderItem = {
        id: medicineId,
        order_id: 0,
        medicine_id: medicineId,
        quantity: 1,
        subtotal: medicine.price,
        image_url: medicine.img_url,
        medicine_name: medicine.name,
        price: medicine.price,
      };
      setCartItems([newCartItem, ...cartItems]);
    }
  };

  const handleFavourites = () => {
    if (!isFavourite) {
      setFavourites([medicine, ...favourites]);
    } else {
      const updatedFavourites = favourites.filter((el) => el.id !== medicine.id);

      setFavourites(updatedFavourites);
    }
  };

  return (
    <div className="medicine-card">
      <div className="medicine-card__photo-block">
        <img
          src={`${medicine.img_url}`}
          className="medicine-card__photo"
          alt="productPhoto"
        />
      </div>
      <div className="medicine-card__title">{medicine.name}</div>
      <div className="medicine-card__price-block">
        <div className="price">{`$${medicine.price}`}</div>
      </div>

      <div className="medicine-card__control">
        <button
          onClick={() => addToCart(medicine.id)}
          className={cn("control-button", { "in-cart": isAdded })}
          type="button"
        >
          {isAdded ? "Added to cart" : "Add to cart"}
        </button>
        <div className="medicine-card__icon-block">
          <button
            className={cn("icon-button-favorities", {
              "icon-button-favorities--is-favourite": isFavourite,
            })}
            aria-label="icon-favorite"
            type="button"
            onClick={handleFavourites}
          />
        </div>
      </div>
    </div>
  );
};
