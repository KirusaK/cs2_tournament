import { Routes, Route } from "react-router-dom";
import { Main } from "../pages/Main/Main";
import { AdminLogin } from "../pages/AdminLogin/AdminLogin";
import { AdminPages } from "../pages/AdminPages/AdminPages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/pages" element={<AdminPages />} />
    </Routes>
  );
};

export default App;
