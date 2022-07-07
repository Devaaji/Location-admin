import { useRouter } from "next/router";
import React, { useState } from "react";
import useUserStore from "../../store/useUserStore";

const DashboardSidebarAdmin = ({ children }) => {
  const router = useRouter();

  const [click, setClick] = useState(false);

  const removeUserStore = useUserStore((state) => state.removeUser);

  const handleButton = () => {
    if (typeof window !== "undefined") {
      removeUserStore();
      router.push("/login");
    }
  };

  const menuItems = [
    {
      href: "/",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      title: "Dashboard",
    },
    {
      href: "/data-karyawan",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      title: "Data Karyawan",
    },
    {
      href: "/input",
      icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
      title: "Input Data",
    },
  ];
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    click ? setClick(false) : setClick(true);
  };

  return (
    <div className="flex">
      <div
        className={`flex-col transition duration-300 w-96 h-screen px-4 py-8 overflow-y-auto border-r shadow-md ${
          click && "hidden"
        }`}
      >
        <h2 className="text-3xl font-semibold text-center text-blue-800">
          Location Admin
        </h2>
        <div className="flex flex-col justify-between mt-6">
          <aside>
            <ul>
              {menuItems.map((menu, index) => (
                <li key={index}>
                  <a
                    className={`flex items-center px-4 py-2 mb-5 text-gray-700 rounded-md ${
                      router.asPath === menu.href && "bg-gray-100"
                    }`}
                    href={menu.href}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={menu.icon}
                      />
                    </svg>
                    <span className="mx-4 font-medium">{menu.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="shadow-md h-max flex py-3 justify-between items-center px-8">
          <button onClick={menuIconClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex flex-row items-center">
            <div className="mr-5 font-semibold">
              <div>Selamat datang, Admin</div>
            </div>
            <button className="text-white bg-red-700 hover:bg-red-800 rounded-md px-3 py-1">
              <div className="flex flex-row p-0.5" onClick={handleButton}>
                <div className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
                Logout
              </div>
            </button>
          </div>
        </div>
        <div className="w-full h-full p-8 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default DashboardSidebarAdmin;
