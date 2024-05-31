import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import "./index.css";
import SKPD from "./pages/admin/skpd/SKPD";
import { Toaster } from "react-hot-toast";
import SubmissionPage from "./pages/SubmissionPage";
import SlipPage from "./pages/SlipPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/skpd" element={<SKPD />} />
          <Route path="/submission" element={<SubmissionPage />} />
          <Route path="/slip" element={<SlipPage />} />
        </Routes>
      </BrowserRouter>

      <Toaster />
    </div>
  );
}

export default App;
