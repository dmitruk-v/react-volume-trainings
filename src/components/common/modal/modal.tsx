import React, { PropsWithChildren } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { usePreventDocumentScroll } from "../../../hooks/usePreventDocumentScroll";

// ASSETS ------------------------------------------------------------
import icoClose from "../../../assets/svg/close_black_24dp.svg";
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./modal.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {
  opened: boolean,
  onClose: () => void
};

const Modal = (props: PropsWithChildren<Props>) => {

  console.log("Modal called", props.opened);

  const modalRef = useClickOutside<HTMLDivElement>(props.onClose, props.opened);
  usePreventDocumentScroll(props.opened);

  return (
    <div className={`modal-overlay ${props.opened ? "modal-overlay--visible" : ""}`}>
      <div ref={modalRef} className="modal">
        <div className="modal__scroller">
          <div className="modal__body">{props.children}</div>
        </div>
        <div className="modal__close">
          <button className="button-type1" onClick={props.onClose}>
            <img src={icoClose} alt="ico-close" />
          </button>
        </div>
      </div>
    </div>
  );
}



export { Modal };