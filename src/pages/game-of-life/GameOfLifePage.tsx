import React, { PropsWithChildren } from "react";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./GameOfLifePage.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {};

const GameOfLifePage = (props: PropsWithChildren<Props>) => {
  return (
    <div className="game-of-life">GameOfLifePage !</div>
  );
}

export { GameOfLifePage }