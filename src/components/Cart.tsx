import React, { useEffect, useState } from "react";
import { CartCard } from "./CartCard";
import { OrderItem } from "../types/OrderItems";
import { Form } from "./Form";

type Props = {
  setCartItems: (item: OrderItem[]) => void;
  cartItems: OrderItem[];
  submitOrder: (order: Order) => void;
  successMessage: string;
  setSuccessMessage: (mess: string) => void;
};

export const Cart: React.FC<Props> = ({
  setCartItems,
  cartItems,
  submitOrder,
  successMessage,
  setSuccessMessage,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [addressError, setAddressError] = useState("");

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [successMessage, setSuccessMessage]);

  const totalPrice = cartItems
    .reduce((acc, item) => acc + Number(item.subtotal), 0)
    .toFixed(2);

  const isDisabled = !name || !email || !phoneNumber || !address;

  const constructOrder = () => {
    return {
      user_email: email,
      user_phone: phoneNumber,
      user_address: address,
      total_price: totalPrice,
      items: cartItems.map((item) => ({
        medicine_id: item.id,
        quantity: item.quantity,
        subtotal: item.subtotal,
        image_url: item.image_url,
        medicine_name: item.medicine_name,
        price: item.price,
      })),
    };
  };

  const handleSubmit = () => {
    if (nameError || emailError || phoneNumberError || addressError) {
      return;
    }
    if (!name.trim()) {
      setNameError("Name is required");
      return;
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!phoneNumber.trim()) {
      setPhoneNumberError("Phone number is required");
      return;
    }

    if (!address.trim()) {
      setAddressError("Address is required");
      return;
    }
    const order = constructOrder();
    submitOrder(order);
  };

  return (
    <div className="cart-page">
      {cartItems.length > 0 ? (
        <>
          <div className="cart-page__content">
            <Form
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              address={address}
              setAddress={setAddress}
              nameError={nameError}
              setNameError={setNameError}
              emailError={emailError}
              setEmailError={setEmailError}
              phoneNumberError={phoneNumberError}
              setPhoneNumberError={setPhoneNumberError}
              addressError={addressError}
              setAddressError={setAddressError}
            />
            <div className="cart-page__list">
              {cartItems.map((cartItem) => (
                <CartCard
                  cartItem={cartItem}
                  setCartItems={setCartItems}
                  cartItems={cartItems}
                />
              ))}
            </div>
          </div>

          <div className="cart-page__submit-total">
            <p className="cart-page__price">{`Total $${totalPrice}`}</p>
            <button
              onClick={handleSubmit}
              className="control-button control-button--big-round"
              disabled={isDisabled}
            >
              Submit
            </button>
          </div>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};
