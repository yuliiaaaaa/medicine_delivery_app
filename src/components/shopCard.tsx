import React from "react";
import { MedicineShop } from "../types/MedicineShop";

type Props = {
  shop: MedicineShop;
  onSelectShop: (shop: number) => void;
};
export const ShopCard: React.FC<Props> = ({ shop, onSelectShop }) => {
  return (
    <div className="shop-card" onClick={() => onSelectShop(shop.id)}>
      <h1 className="shop-card__name">{shop.name}</h1>
    </div>
  );
};
