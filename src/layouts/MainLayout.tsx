import { PropsWithChildren } from "react";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./MainLayout.css"
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {};

const MainLayout = (props: PropsWithChildren<Props>) => {
  return (
    <div className="main-layout">
      {/* <header className="header">header</header> */}
      <main className="content">{props.children}</main>
      {/* <footer className="footer">footer</footer> */}
    </div>
  );
}

export { MainLayout };