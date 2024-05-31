import React from "react";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="flex" style={{ minHeight: "100vh" }}>
        <div>
          <Sidebar />
        </div>
        <div className="w-full p-10">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
