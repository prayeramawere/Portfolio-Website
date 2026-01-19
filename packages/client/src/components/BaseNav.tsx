import React from "react";
import { Link as Links } from "react-router-dom";
import { Mail } from "lucide-react";
import { Edit } from "lucide-react";

function BaseNav() {
  return (
    <nav className="bg-[#0d0c1d] w-full h-[60px] flex px-2  items-center justify-end  nav">
      <div className="mr-auto gap-2 flex items-center">
        <h1 className="font-extrabold text-white bg-primary/15 rounded-lg px-3 py-1">
          Prayer Mawere
        </h1>
        <ul className="list-none  gap-2 text-white text-sm hidden md:flex">
          <Links to={{ hash: "about" }}>
            <li className="hover:text-primary">about</li>
          </Links>
          <Links to="/blogs">
            <li className="hover:text-primary">blogs</li>
          </Links>
          <Links to={{ hash: "contact" }}>
            <li className="hover:text-primary">contact</li>
          </Links>
          <Links to={{ pathname: "http://localhost:5173", hash: "projects" }}>
            <li className="hover:text-primary">projects</li>
          </Links>
        </ul>
      </div>

      <div className="flex gap-2 p-4">
        <div className="w-[300px] rounded-2xl bg-primary/20 h-fit">
          <form action=" " className="flex">
            <input
              type="email"
              name="email"
              placeholder="enter your email"
              className="px-2 text-white search-input outline-none placeholder:font-light! placeholder:text-sm!"
            />
            <button
              className="px-3 py-1 bg-primary rounded-3xl text-white text-sm"
              type="submit"
            >
              subcribe
            </button>
          </form>
        </div>
        <Links to={""}>
          <Mail className="text-white hover:text-primary" />
        </Links>
        <Links to={""}>
          <Edit className="text-white hover:text-primary" />
        </Links>
      </div>
    </nav>
  );
}

export default BaseNav;
