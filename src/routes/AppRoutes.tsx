import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import NovaDoacao from "../pages/NovaDoacao";
import MinhasDoacoes from "../pages/MinhasDoacoes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/nova-doacao" element={<NovaDoacao />} />
        <Route path="/minhas-doacoes" element={<MinhasDoacoes />} />
      </Routes>
    </BrowserRouter>
  );
}
