import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { HEADER_LINKS } from "../../static";
import logo from '/src/assets/logos/logo.png';
import { FaMoon } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { IoMenu } from "react-icons/io5";

const LANGUAGES = [
  { label: "English", code: "en" },
  { label: "Uzbek", code: "uz" },
  { label: "Russian", code: "ru" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(localStorage.getItem("dark_mode") === "true");

  const toggleDarkMode = () => {
    setDark((prevDark) => {
      const newDarkMode = !prevDark;
      document.documentElement.classList.toggle("dark", newDarkMode);
      localStorage.setItem("dark_mode", newDarkMode);
      return newDarkMode;
    });
  };

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const changeLang = (e) => {
    const langCode = e.target.value;
    localStorage.setItem("lang_code", langCode);
    window.location.reload();
  };

  const handleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <header
      id="header"
      className="w-full h-[80px] bg-white dark:bg-black sticky top-0 left-0 z-20 shadow-md"
    >
      <nav className="container relative mx-auto px-4 h-full flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-4">
          <div>
            <button
              onClick={handleMenu}
              className="text-2xl text-black dark:text-white hidden max-[720px]:block"
            >
              <IoMenu />
            </button>
          </div>
          <Link to="/">
            <img src={logo} alt="logo" className="w-[112px] h-9" />
          </Link>
        </div>

        <ul className="hidden text-black dark:text-white gap-8 flex-wrap max-[650px]:fixed max-[650px]:bottom-0 max-[650px]:left-0   max-[720px]:hidden md:flex">
          {HEADER_LINKS.map((link) => (
            <li key={link.id} className="flex flex-col items-center">
              <NavLink
                to={link.url}
                className="flex flex-col items-center gap-1"
              >
                {link.icon}
                <p>{link.title}</p>
              </NavLink>
            </li>
          ))}
        </ul>

        {open && (
          <ul className="absolute top-[80px] left-0 w-full bg-white dark:bg-black text-black dark:text-white flex flex-col gap-4 p-4 shadow-lg md:hidden">
            {HEADER_LINKS.map((link) => (
              <li key={link.id} className="flex flex-col items-center">
                <NavLink
                  to={link.url}
                  className="flex flex-col items-center gap-1"
                  onClick={() => setOpen(false)}
                >
                  {link.icon}
                  <p>{link.title}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        {open && (
          <ul className="absolute top-[80px] left-0 w-full bg-white dark:bg-black text-black dark:text-white flex flex-col gap-4 p-4 shadow-lg md:hidden">
            {HEADER_LINKS.map((link) => (
              <li key={link.id} className="flex flex-col items-center">
                <NavLink
                  to={link.url}
                  className="flex flex-col items-center gap-1"
                  onClick={() => setOpen(false)}
                >
                  {link.icon}
                  <p>{link.title}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-5">
          <select
            className="bg-gray-300 dark:bg-slate-800 dark:text-white rounded-lg py-2 px-2 outline-none"
            defaultValue={localStorage.getItem("lang_code") || "en"}
            onChange={changeLang}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>

          <button
            onClick={toggleDarkMode}
            className="text-2xl text-gray-700 dark:text-white"
          >
            {dark ? <MdLightMode className="text-[gold]" /> : <FaMoon />}
          </button>
          <button className="bg-blue-500 text-white font-medium text-sm py-2 px-4 rounded-lg hover:bg-blue-600 w-full">
            Login
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
