import { Routes, Route } from "react-router-dom";
import Landing from "./views/Landing";
import Login from "./views/Login";
import Access from "./views/Access";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/access" element={<Access />} />
    </Routes>
  );
};

export default Router;
