import React from "react";
import { Link as Links } from "react-router-dom";

function FloatingNav() {
  return (
    <div className="w-full flex justify-center">
      <div className="navbar bottom-5 text-center text-element flex justify-center items-center mt-10 mb-3">
        <ul className="list-none flex gap-4">
          <Links to="/">
            <li className="link">home</li>
          </Links>
          <Links to={{ hash: "about" }}>
            <li className="link">about</li>
          </Links>
          <Links to="/blogs">
            <li className="link">blogs</li>
          </Links>
          <Links to={{ hash: "contact" }}>
            <li className="link">contact</li>
          </Links>
          <Links to={{ pathname: "http://localhost:5173", hash: "projects" }}>
            <li className="link">projects</li>
          </Links>
        </ul>
      </div>
    </div>
  );
}

export default FloatingNav;
