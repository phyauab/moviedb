import { useAppContext } from "../context/app_context";
import { links } from "../constants/utils";

const sideBarClose =
  "transition duration-500 ease-in-out transform translate-x-full";
const sideBar =
  "flex flex-col h-screen fixed top-0 right-0 z-50 bg-gray-100 w-1/2 p-4 lg:w-96 ";
const sideBarOpen = "w-0 transition duration-500";
const header = "p-4 border-b-2 border-gray-300 flex";
const h2 = "flex-1 text-green-300 text-4xl text-start font-semibold";
const btnClose = "flex-end p-1";
const nav = "p-4";
const li = "";
const a =
  "hover:underline hover:bg-gray-200 w-full cursor-pointer block p-2 py-2";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useAppContext();
  return (
    <aside
      className={
        isSidebarOpen
          ? `${sideBarOpen} ${sideBar}`
          : `${sideBarClose} ${sideBar}`
      }
    >
      <div className={header}>
        <h2 className={h2}>
          <a href="/#">MovieDB</a>
        </h2>
        <button className={btnClose} onClick={closeSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <nav className={nav}>
        <ul className="">
          {links.map((link, index) => {
            const { text, url } = link;
            return (
              <li key={index} className={li}>
                <a href={url} className={a}>
                  {text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
