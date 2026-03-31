import { Routes, Route } from "react-router-dom";
import { Main } from "../pages/Main/Main";
import { Admin } from "../pages/Admin/Admin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default App;
