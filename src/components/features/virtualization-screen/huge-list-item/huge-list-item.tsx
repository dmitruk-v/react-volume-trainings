import { PropsWithChildren } from "react";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./huge-list-item.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {
  text: string,
  height: number,
}

const HugeListItem = (props: PropsWithChildren<Props>): JSX.Element => {
  const rand = 150 + Math.floor(Math.random() * 100);
  const randGrey = `rgb(${rand}, ${rand}, ${rand})`;
  return (
    <li className="hl-item" style={{ backgroundColor: randGrey, height: props.height }}> { props.text}</li >
  );
}

export { HugeListItem }