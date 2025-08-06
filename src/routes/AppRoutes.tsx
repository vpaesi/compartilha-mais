import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import NovaDoacao from "../pages/NovaDoacao";
import MinhasDoacoes from "../pages/MinhasDoacoes";
import DoacoesPublicas from "../pages/DoacoesPublicas";
import DoacoesRecebidas from "../pages/DoacoesRecebidas";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/nova-doacao" element={<NovaDoacao />} />
        <Route path="/minhas-doacoes" element={<MinhasDoacoes />} />
        <Route path="/publicas" element={<DoacoesPublicas />} />
        <Route path="/recebidas" element={<DoacoesRecebidas />} />
      </Routes>
    </BrowserRouter>
  );
}
