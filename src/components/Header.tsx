import React from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { Medicine } from "../types/Medicine";
type Props = {
  favourites: Medicine[];
};

export const Header: React.FC<Props> = ({ favourites }) => {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__menu">
          <div className="header__logo logo">
            <NavLink to="/" className="logo-link">
              <img src="img/logo.png" className="logo-img" alt="logo" />
            </NavLink>
          </div>
          <nav className="navbar">
            <NavLink to="/" className="navbar__link">
              Find medicine
            </NavLink>

            <NavLink to="/cart" className="navbar__link">
              Cart
            </NavLink>
          </nav>
        </div>

        <div className="header__right">
          <div className="header__icons">
            <div className="header__icon-block">
              <NavLink
                to="/favourites"
                className={cn("icon icon--favorities", {
                  count: favourites.length > 0,
                })}
                data-count={favourites.length}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
