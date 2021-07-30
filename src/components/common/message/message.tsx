import { PropsWithChildren } from "react";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./message.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type MessageType = "info" | "error" | "warning" | "success";
type Props = {
  type: MessageType;
};

const Message = (props: PropsWithChildren<Props>) => {
  return (
    <div className={`message message--${props.type}`}>{props.children}</div>
  );
}

export { Message };