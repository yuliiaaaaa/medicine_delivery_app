import React from "react";
import { ShopCard } from "./shopCard";
import { MedicineShop } from "../types/MedicineShop";
type Props = {
  shops: MedicineShop[];
  onSelectShop: (shop: number) => void;
};

export const ShopList: React.FC<Props> = ({ shops, onSelectShop }) => {
  return (
    <div className="shop-list">
      <div className="shop-list__container">
        {shops.map((shop) => (
          <div className="shop-list__item">
          <ShopCard key={shop.id} shop={shop} onSelectShop={onSelectShop} />
          </div>
        ))}
      </div>
    </div>
  );
};
