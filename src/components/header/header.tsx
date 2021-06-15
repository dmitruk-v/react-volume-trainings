import React from "react";
import { NavLink } from "react-router-dom";

// STYLES ------------------------------------------
import "./header.css";
// -------------------------------------------------

type Props = {}

const Header: React.FC<Props> = (props) => {

  return (
    <header className="header">
      <div className="header__menu">
        <div className="header-menu">
          <ul className="header-menu__list">
            <li className="header-menu__item">
              <NavLink
                to={"/"}
                exact={true}
                className="header-menu__link"
                activeClassName="header-menu__link--active">Home</NavLink>
            </li>
            <li className="header-menu__item">
              <NavLink
                to={"/schedule"}
                className="header-menu__link"
                activeClassName="header-menu__link--active">Schedule</NavLink>
            </li>
            <li className="header-menu__item">
              <NavLink
                to={"/options"}
                className="header-menu__link"
                activeClassName="header-menu__link--active">Options</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;