import Link from "next/link";
import "./sidebarStyles.css";

const Sidebar = () => {
  return (
    <>
      <header>
        <div className="logo" >
          <Link href="/">
            Brain Agriculture
          </Link>
        </div>
        <div className="navigation">
          <Link href="/producers">Produtores</Link>
          <Link href="/register">Cadastrar</Link>
        </div>
        <div id="menu-icon">&#9776;</div>
      </header>
    </>
  );
};

export default Sidebar;
