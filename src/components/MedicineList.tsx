import React from "react";
import { Medicine } from "../types/Medicine";
import { MedicineCard } from "./MedicineCard";
import { OrderItem } from "../types/OrderItems";
import { useSearchParams } from "react-router-dom";
type Props = {
  medicines: Medicine[];
  cartItems: OrderItem[];
  setCartItems: (order: OrderItem[]) => void;
  favourites: Medicine[];
  setFavourites: (fav: Medicine[]) => void;
};
export const MedicineList: React.FC<Props> = ({
  medicines,
  cartItems,
  setCartItems,
  favourites,
  setFavourites,
}) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sort") || "";

  const getPreparedMedicines = () => {
    const favoriteMedicines = medicines.filter((medicine) =>
      favourites.some((fav) => fav.id === medicine.id)
    );
    const nonFavoriteMedicines = medicines.filter(
      (medicine) => !favourites.some((fav) => fav.id === medicine.id)
    );

    switch (sortBy) {
      case "price":
        return [
          ...favoriteMedicines.sort((el1, el2) => el1.price - el2.price),
          ...nonFavoriteMedicines.sort((el1, el2) => el1.price - el2.price),
        ];
      case "date":
        return [
          ...favoriteMedicines.sort((el1, el2) => {
            const date1 = new Date(el1.date_added);
            const date2 = new Date(el2.date_added);
            return date1.getTime() - date2.getTime();
          }),
          ...nonFavoriteMedicines.sort((el1, el2) => {
            const date1 = new Date(el1.date_added);
            const date2 = new Date(el2.date_added);
            return date1.getTime() - date2.getTime();
          }),
        ];
      default:
        return [...favoriteMedicines, ...nonFavoriteMedicines];
    }
  };
  const preparedMedicines = getPreparedMedicines();

  return (
    <div className="medicine-list">
      {preparedMedicines.map((medicine) => (
        <MedicineCard
          medicine={medicine}
          cartItems={cartItems}
          setCartItems={setCartItems}
          favourites={favourites}
          setFavourites={setFavourites}
        />
      ))}
    </div>
  );
};
