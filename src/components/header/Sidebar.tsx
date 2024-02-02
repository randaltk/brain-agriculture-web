"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import "./sidebarStyles.css";

const Sidebar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768); // Adapte conforme necessário
    };

    // Verificar a largura da tela ao montar o componente
    checkScreenWidth();

    // Adicionar um listener para verificar alterações na largura da tela
    window.addEventListener("resize", checkScreenWidth);

    // Remover o listener ao desmontar o componente
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleLinkClick = (link: string) => {
    // Fechar o modal apenas em dispositivos móveis
    if (isMobile) {
      toggleModal();
    }
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

      {(isMobile && isModalOpen) && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-links">
              <span onClick={() => handleLinkClick("/producers")}>
                Produtores
              </span>
              <br />
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
