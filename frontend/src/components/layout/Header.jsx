import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: "Home" },
    { id: 2, text: "Products" },
    { id: 3, text: "Contact" },
    { id: 4, text: "About" },
  ];

  return (
    <div className="bg-slate-700 flex justify-between items-center h-20  mx-auto px-4 text-white">
      {/* Logo */}
      <h1 className="w-full text-3xl font-bold text-white">QIVEE.</h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-3 hover:bg-slate-500 rounded-xl m-[.4rem] cursor-pointer duration-300"
          >
            <Link to={item.text}>{item.text}</Link>
          </li>
        ))}
      </ul>
      <Link
        to={"/cart"}
        className="hover:bg-slate-500 p-3 rounded-full duration-300"
      >
        <AiOutlineShoppingCart size={25} />
      </Link>
      <Link
        to={"/user"}
        className="hover:bg-slate-500 p-3 rounded-full duration-300"
      >
        <AiOutlineUser size={25} />
      </Link>
      {/* Mobile Navigation Icon */}
      <div
        onClick={handleNav}
        className="block md:hidden cursor-pointer hover:bg-slate-500 p-4 rounded-full duration-300"
      >
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-[gray-900] bg-slate-700 ease-in-out duration-500 z-50"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <h1 className="w-full text-3xl font-bold text-white m-4">QIVEE.</h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b rounded-xl hover:bg-slate-500 duration-300 cursor-pointer border-gray-600"
          >
            <Link to={item.text}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
