import { WithChildren } from "../../../store";

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

const Message = (props: WithChildren<Props>) => {
  return (
    <div className={`message message--${props.type}`}>{props.children}</div>
  );
}

export { Message };