import React, { PropsWithChildren, useContext, useEffect, useState } from "react";

type CancelOnEscapeContextType = {
  setOnEscape: (handler: { onEscape: () => void }) => void
};

const CancelOnEscapeContext = React.createContext<CancelOnEscapeContextType>({ setOnEscape(fn) { } });
CancelOnEscapeContext.displayName = "CancelOnEscapeContext";

type Props = {};
const CancelOnEscapeProvider = (props: PropsWithChildren<Props>) => {
  const [onEscapeHandler, setOnEscapeHandler] = useState({ onEscape() { } });

  useEffect(() => {
    console.log("CancelOnEscape useEffect called");
    const handleKeydown = (evt: KeyboardEvent) => {
      if (evt.code === "Escape") {
        onEscapeHandler.onEscape();
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    }
  }, [onEscapeHandler]);

  return (
    <CancelOnEscapeContext.Provider value={{ setOnEscape: setOnEscapeHandler }}>
      {props.children}
    </CancelOnEscapeContext.Provider>
  );
}

const useCancelOnEscapeContext = () => {
  return useContext(CancelOnEscapeContext);
}

export { CancelOnEscapeProvider, useCancelOnEscapeContext }