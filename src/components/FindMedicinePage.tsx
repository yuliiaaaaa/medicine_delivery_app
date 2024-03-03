import React from "react";
import { MedicineList } from "./MedicineList";
import { ShopList } from "./ShopList";
import { MedicineShop } from "../types/MedicineShop";
import { Medicine } from "../types/Medicine";
import { OrderItem } from "../types/OrderItems";
import { Dropdown } from "./DropDown";

type Props = {
  shops: MedicineShop[];
  onSelectShop: (shopId: number) => void;
  medicines: Medicine[];
  cartItems: OrderItem[];
  setCartItems: (order: OrderItem[]) => void;
  favourites: Medicine[];
  setFavourites: (fav: Medicine[]) => void;
};

export const FindMedicinePage: React.FC<Props> = ({
  shops,
  onSelectShop,
  medicines,
  cartItems,
  setCartItems,
  favourites,
  setFavourites,
}) => {
  return (
    <div className="find-medicines">
      <div className="find-medicines__shopBlock">
        <ShopList shops={shops} onSelectShop={onSelectShop} />
      </div>
      {medicines.length > 0 && (
        <div className="find-medicines__medicines">
          <div className="find-medicines__dropdown">
            <Dropdown />
          </div>
          <MedicineList
            medicines={medicines}
            cartItems={cartItems}
            setCartItems={setCartItems}
            favourites={favourites}
            setFavourites={setFavourites}
          />
        </div>
      )}
    </div>
  );
};
