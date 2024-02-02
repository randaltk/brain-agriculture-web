"use client";

import { useState } from "react";
import Link from "next/link";
import "./sidebarStyles.css";

const Sidebar = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleLinkClick = (link: string) => {
    toggleModal();
    window.location.href = link;
  };

  return (
    <>
      <header>
        <div className="logo">
          <Link href="/">Brain Agriculture</Link>
        </div>
        <div className="navigation">
          <span onClick={() => handleLinkClick("/producers")}>Produtores</span>
          <span onClick={() => handleLinkClick("/register")}>Cadastrar</span>
        </div>
        <div id="menu-icon" onClick={toggleModal}>
          &#9776;
        </div>
      </header>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-links">
              <span onClick={() => handleLinkClick("/producers")}>
                Produtores
              </span>
              <br/>
              <span onClick={() => handleLinkClick("/register")}>
                Cadastrar
              </span>
            </div>
            <div>
              <button className="modal-button" onClick={toggleModal}>
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
