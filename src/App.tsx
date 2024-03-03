import axios from "axios";
import "bulma";
import React, { useEffect, useState } from "react";
import "./styles/styles.scss";
import { Header } from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { FindMedicinePage } from "./components/FindMedicinePage";
import { useLocalStorage } from "./helpers/UseLocalStorage";
import { Cart } from "./components/Cart";
import { OrderItem } from "./types/OrderItems";
import { Medicine } from "./types/Medicine";
import { FavouritePage } from "./components/FavouritePage";
import { ErrorElement } from "./components/Error";
import { NotFoundPage } from "./components/NotFoundPage";

export function App() {
  const [shops, setShops] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [cartItems, setCartItems] = useLocalStorage<OrderItem[]>("cart", []);
  const [selectedShop, setSelectedShop] = useState<number | null>(null);
  const [favourites, setFavourites] = useLocalStorage<Medicine[]>(
    "favourites",
    []
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/shops")
      .then((response) => setShops(response.data))
      .catch(() => setIsError(true));
  }, []);

  const fetchMedicinesByShop = (shopId: number) => {
    axios
      .get(`http://localhost:5000/medicines/${shopId}`)
      .then((response) => {
        setMedicines(response.data);
      })
      .catch(() => setIsError(true));
  };

  const submitOrder = (orderData: any) => {
    axios
      .post("http://localhost:5000/orders", orderData)
      .then(() => {
        setSuccessMessage("Order submitted successfully!");
        setCartItems([]);
      })
      .catch(() => {
        setIsError(true);
      });
  };

  const handleShopSelect = (shopId: number) => {
    setSelectedShop(shopId);
    fetchMedicinesByShop(shopId);
  };

  return (
    <div className="App">
      <Header favourites={favourites} />
      <div className="App__content">
        {isError && <ErrorElement />}
        <Routes>
          <Route
            path="/"
            element={
              <FindMedicinePage
                shops={shops}
                onSelectShop={handleShopSelect}
                medicines={medicines}
                cartItems={cartItems}
                setCartItems={setCartItems}
                favourites={favourites}
                setFavourites={setFavourites}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                setCartItems={setCartItems}
                cartItems={cartItems}
                submitOrder={submitOrder}
                successMessage={successMessage}
                setSuccessMessage={setSuccessMessage}
              />
            }
          />
          <Route
            path="/favourites"
            element={
              <FavouritePage
                cartItems={cartItems}
                setCartItems={setCartItems}
                favourites={favourites}
                setFavourites={setFavourites}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}
