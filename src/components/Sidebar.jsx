import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/authSlice";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { FaBuilding } from "react-icons/fa6";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const __logout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const Menus = [
    {
      title: "Dasbor",
      icon: <MdDashboard />,
      to: "/dashboard",
    },
    {
      title: "Riwayat Pembayaran",
      icon: <FaUserFriends />,
      to: "/slip",
    },
    {
      title: "Riwayat Pengajuan",
      icon: <FaUserFriends />,
      to: "/riwayatsub",
    },
    {
      title: "Daftar Pengajuan",
      icon: <FaUserFriends />,
      to: "/submission",
      admin: true,
    },
    {
      title: "Daftar Pembayaran",
      icon: <FaUserFriends />,
      to: "/slip",
      admin: true,
    },
    {
      title: "Kelola Pengguna",
      icon: <FaUserFriends />,
      to: "/users",
      admin: true,
    },
    {
      title: "Kelola SKPD",
      icon: <FaBuilding />,
      to: "/skpd",
      admin: true,
    },
  ];

  const filteredMenus = Menus.filter((menu) => {
    return !menu.admin || (user && user.role === "admin");
  });

  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-dark-purple h-screen p-5 shadow  pt-8 relative duration-300`}
    >
      <IoIosArrowDroprightCircle
        className={`absolute cursor-pointer -right-3 top-9 bg-white w-8 h-8 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />

      <div className="flex items-center gap-x-4">
        <h1
          className={` origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          TGR
        </h1>
      </div>
      <div className="flex flex-col justify-between h-full pb-16">
        <ul className="pt-6">
          {filteredMenus.map((Menu, index) => (
            <NavLink
              to={Menu.to}
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-black text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <span>{Menu.icon}</span>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </NavLink>
          ))}
        </ul>
        <button
          onClick={__logout}
          className={`btn btn-primary ${open && "hidden"}`}
        >
          <span>
            <IoLogOut className="w-6 h-6 text-white" />
          </span>
        </button>
        <button
          onClick={__logout}
          className={` ${!open && "hidden"} btn btn-primary`}
        >
          Keluar
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
