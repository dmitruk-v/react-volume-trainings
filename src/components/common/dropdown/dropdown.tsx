import React from "react";

// ASSETS ------------------------------------------
import icoClose from "../../../assets/svg/close_black_24dp.svg";
// -------------------------------------------------

// STYLES ------------------------------------------
import "./dropdown.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
// -------------------------------------------------

type CommonProps = {
  isOpened: boolean,
  classNames?: string,
};

type ClosableProps =
  | { withCloseBtn: true, onClose: () => void }
  | { withCloseBtn?: false, onClose?: never };

type Props = CommonProps & ClosableProps;

const Dropdown = React.forwardRef<HTMLDivElement, React.PropsWithChildren<Props>>((props, ref) => {
  return (
    <div ref={ref} className={`dropdown ${props.isOpened ? "dropdown--opened" : ""} ${props.classNames}`}>
      <div className="dropdown__inner">
        <div className="dropdown__body">{props.children}</div>
        {
          props.withCloseBtn === true
            ? (
              <button className="button-type1 dropdown__close-btn" onClick={() => props.onClose()}>
                <img src={icoClose} alt="ico-close-menu" />
              </button>
            )
            : (null)
        }
      </div>
    </div>
  );
});

export { Dropdown };