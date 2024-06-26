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
import RiwayatsubPage from "./pages/RiwayatsubPage";
import PengajuanUserPage from "./pages/PengajuanUserPage";
import RiwayatslipPage from "./pages/RiwayatslipPage";
import SlipUserPage from "./pages/SlipUserPage";
import AddAdmin from "./pages/AddAdmin";
import EditAdmin from "./pages/EditAdmin";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/admin/add" element={<AddAdmin />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/admin/edit/:id" element={<EditAdmin />} />
          <Route path="/skpd" element={<SKPD />} />
          <Route path="/submission" element={<SubmissionPage />} />
          <Route path="/slip" element={<SlipPage />} />
          <Route path="/riwayatsub" element={<RiwayatsubPage />} />
          <Route path="/riwayatslip" element={<RiwayatslipPage />} />
          <Route path="/users/lihat/:id" element={<PengajuanUserPage />} />
          <Route path="/users/lihat/slip/:id" element={<SlipUserPage />} />
        </Routes>
      </BrowserRouter>

      <Toaster />
    </div>
  );
}

export default App;
