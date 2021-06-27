import { React } from "react";
import { links } from "../constants/utils";
import { useAppContext } from "../context/app_context";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { openSidebar } = useAppContext();
  return (
    <header className="flex content-center py-4">
      {/* LOGO */}
      <div className="flex-1">
        <h2 className="text-green-500 text-4xl text-start font-semibold">
          <Link to="/">MovieDB</Link>
        </h2>
      </div>
      {/* NAV */}
      <nav className="flex-1 hidden lg:block">
        <ul className="flex justify-center h-full items-center">
          {links.map((link, index) => {
            const { text, url } = link;
            return (
              <li
                key={index}
                className="text-lg font-semibold transition duration-300 ease-in-out hover:text-green-500"
              >
                <Link to={url} className="px-4">
                  {text}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* BUTTONS */}
      <div className="flex-1 flex justify-end">
        <button className={`btn`}>Login</button>
        <button className="p-1 ml-2 mr-8 lg:hidden" onClick={openSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
