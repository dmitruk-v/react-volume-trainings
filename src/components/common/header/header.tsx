import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./header.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { HeaderMenu } from "../header-menu/header-menu";
import { HeaderUser } from "../header-user/header-user";
// -------------------------------------------------

type Props = {}

const Header: React.FC<Props> = (props) => {
  const selectedUserId = useSelector<RootState, string>(state => state.selectedUser);

  return (
    <header className="header">
      <div className="header__layout">
        <div className="header__user">
          <HeaderUser selectedUserId={selectedUserId} />
        </div>
        {selectedUserId.length > 0 && (
          <div className="header__menu">
            <HeaderMenu selectedUserId={selectedUserId} />
          </div>
        )}
      </div>
    </header>
  );
}

export { Header };