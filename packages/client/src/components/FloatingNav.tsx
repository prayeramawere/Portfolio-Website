import React from "react";
import { Link as Links } from "react-router-dom";

function FloatingNav() {
  return (
    <div className="w-full flex justify-center">
      <div className="navbar bottom-5 text-center text-element flex justify-center items-center mt-10 mb-3">
        <ul className="list-none flex gap-4">
          <a href="/">
            <li className="link">home</li>
          </a>
          <a href="./#about">
            <li className="link">about</li>
          </a>
          <a href="/blogs">
            <li className="link">blogs</li>
          </a>
          <a href="#contact">
            <li className="link">contact</li>
          </a>
          <a href="#projects">
            <li className="link">projects</li>
          </a>
        </ul>
      </div>
    </div>
  );
}

export default FloatingNav;
