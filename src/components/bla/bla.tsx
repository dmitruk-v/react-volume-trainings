import React, { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useLocalStorage } from "../../hooks/useLocalStorage";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
import { Dropdown } from "../common/dropdown/dropdown";
// -------------------------------------------------------------------

type Props = {};

const Bla = (props: Props) => {

  console.log("Bla called");

  const [menuOpened, setMenuOpened] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const nameLsProvider = useLocalStorage<boolean>("name");

  console.log("Loaded:", nameLsProvider.load());

  useEffect(() => {
    console.log("useEffect called");
    setTimeout(() => {
      nameLsProvider.save(false);
      console.log("Saved:", false);
    }, 1000);
  }, [nameLsProvider]);

  useClickOutside(dropdownRef, () => {
    if (menuOpened === true) {
      setMenuOpened(false);
    }
  });

  return (
    <div>
      <button onClick={() => setMenuOpened(true)}>Open menu</button>
      <div style={{ "position": "relative" }}>
        <Dropdown
          ref={dropdownRef}
          isOpened={menuOpened}
          classNames=""
        >
          <div className="dropdown-menu">
            <ul className="dropdown-menu__list">
              <li className="dropdown-menu__item">
                <button className="dropdown-menu__button">Valera</button>
              </li>
              <li className="dropdown-menu__item">
                <button className="dropdown-menu__button">Lena</button>
              </li>
              <li className="dropdown-menu__item">
                <button className="dropdown-menu__button">Anton</button>
              </li>
              <li className="dropdown-menu__item">
                <button className="dropdown-menu__button">Vera</button>
              </li>
            </ul>
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

export { Bla };