import { forwardRef, PropsWithChildren } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { getClasses } from "../utils/css-utils";

// ASSETS ------------------------------------------
import icoClose from "../../assets/svg/close_black_24dp.svg";
// -------------------------------------------------

// STYLES ------------------------------------------
import "./Dropdown.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
// -------------------------------------------------

type CommonProps = {
  isOpened: boolean,
  classNames?: string,
};

type ClosableProps = { withCloseBtn?: boolean, onClose: () => void }

type Props = CommonProps & ClosableProps;

const Dropdown = forwardRef<HTMLDivElement, PropsWithChildren<Props>>((props, ref) => {

  const dropdownRef = useClickOutside<HTMLDivElement>(props.onClose, props.isOpened);
  const dropdownClasses = getClasses(
    props.classNames !== undefined ? props.classNames : "",
    { "dropdown--opened": props.isOpened, }
  );

  return (
    <div
      ref={dropdownRef}
      className={`dropdown ${dropdownClasses}`}
    >
      <div className="dropdown__inner">
        <div className="dropdown__body">{props.children}</div>
        {props.withCloseBtn && (
          <button className="button-type1 dropdown__close-btn" onClick={() => props.onClose()}>
            <img src={icoClose} alt="ico-close-menu" />
          </button>
        )}
      </div>
    </div>
  );
});

export { Dropdown };