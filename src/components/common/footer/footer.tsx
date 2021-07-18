import React from "react";

// STYLES ------------------------------------------
import "./footer.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
// -------------------------------------------------

type Props = {}

const Footer: React.FC<Props> = (props) => {
  return (
    <footer className="footer">&copy; Valeriy Dmitruk</footer>
  );
}

export { Footer };