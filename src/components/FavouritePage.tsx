import React from "react";
import { MedicineList } from "./MedicineList";
import { Medicine } from "../types/Medicine";
import { OrderItem } from "../types/OrderItems";

type Props = {
  cartItems: OrderItem[];
  setCartItems: (order: OrderItem[]) => void;
  favourites: Medicine[];
  setFavourites: (fav: Medicine[]) => void;
};

export const FavouritePage: React.FC<Props> = ({
  cartItems,
  setCartItems,
  favourites,
  setFavourites,
}) => {
  return (
    <div className="favourite-page">
      <div className="favourite-page__list">
        <MedicineList
          medicines={favourites}
          cartItems={cartItems}
          setCartItems={setCartItems}
          favourites={favourites}
          setFavourites={setFavourites}
        />
      </div>
    </div>
  );
};
