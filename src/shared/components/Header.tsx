// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./Header.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
// -------------------------------------------------

type Props = {
  userSelector: React.ReactNode,
  userMenu: React.ReactNode,
}

const Header = (props: Props) => {
  return (
    <header className="header">
      <div className="header__layout">
        <div className="header__user">
          {props.userSelector}
        </div>
        <div className="header__menu">
          {props.userMenu}
        </div>
      </div>
    </header>
  );
}

export { Header };