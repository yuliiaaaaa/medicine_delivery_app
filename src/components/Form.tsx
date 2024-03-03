import React from "react";
import InputMask from "react-input-mask";
import cn from "classnames";

type Props = {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  address: string;
  setAddress: (address: string) => void;
  nameError: string;
  setNameError: (error: string) => void;
  emailError: string;
  setEmailError: (error: string) => void;
  phoneNumberError: string;
  setPhoneNumberError: (error: string) => void;
  addressError: string;
  setAddressError: (error: string) => void;
};

export const Form: React.FC<Props> = ({
  name,
  setName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  address,
  setAddress,
  nameError,
  setNameError,
  emailError,
  setEmailError,
  phoneNumberError,
  setPhoneNumberError,
  addressError,
  setAddressError,
}) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameError("");
    const value = e.target.value;
    setName(value);
    if (!value.trim()) {
      setNameError("Name is required");
    } else if (value.trim().length < 3) {
      setNameError("Name must be at least 3 characters long");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError("");
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPhoneNumberError("");
  const value = e.target.value;
  const numericValue = value.replace(/\D/g, "");
  setPhoneNumber(numericValue);
  if (!numericValue.trim()) {
    setPhoneNumberError("Phone number is required");
  } else if (numericValue.length < 12) {
    setPhoneNumberError("Please enter a valid phone number");
  }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressError("");
    const value = e.target.value;
    setAddress(value);
    if (!value.trim()) {
      setAddressError("Address is required");
    }
  };

  return (
    <div className="cart-page__form">
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className={cn("input", { "is-danger": nameError })}
            type="text"
            placeholder="Text input"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        {nameError && <p className="help is-danger">{nameError}</p>}
      </div>

      <div className="field">
        <label className="label">Email</label>
        <input
          className={cn("input", { "is-danger": emailError })}
          type="email"
          placeholder="Email input"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <p className="help is-danger">{emailError}</p>}
      </div>

      <div className="field">
        <label className="label">Phone</label>
        <div className="control">
          <InputMask
            mask="+38 (999) 999-99-99"
            className={cn("input", { "is-danger": phoneNumberError })}
            type="tel"
            value={phoneNumber}
            placeholder="+38 (999) 999-99-99"
            onChange={handlePhoneNumberChange}
          />
        </div>
        {phoneNumberError && (
          <p className="help is-danger">{phoneNumberError}</p>
        )}
      </div>

      <div className="field">
        <label className="label">Address</label>
        <div className="control">
          <input
            className={cn("input", { "is-danger": addressError })}
            type="text"
            placeholder="Text input"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        {addressError && <p className="help is-danger">{addressError}</p>}
      </div>
    </div>
  );
};
