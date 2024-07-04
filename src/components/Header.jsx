import React from "react";
import "./assets/css/Header.css";
export default function Header() {
  return (
    <>
      <header className="header">
        <a href="/" className="header__logo">
          <span className="tic">Tic </span>
          <span className="tac">Tac </span>
          <span className="toe">Toe</span>
        </a>
      </header>
    </>
  );
}
