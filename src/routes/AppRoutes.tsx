import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import NovaDoacao from "../pages/NovaDoacao";
import MinhasDoacoes from "../pages/MinhasDoacoes";
import DoacoesPublicas from "../pages/DoacoesPublicas";
import DoacoesRecebidas from "../pages/DoacoesRecebidas";
import Perfil from "../pages/Perfil";
import ChatDoacao from "../pages/ChatDoacao";
import ChatsAtivos from "../pages/ChatsAtivos";
import EditarDoacao from "../pages/EditarDoacao";
import Footer from "../components/Footer";
import ItemCadastrado from "../pages/ItemCadastrado";

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
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/chat/:id" element={<ChatDoacao />} />
        <Route path="/chats" element={<ChatsAtivos />} />
        <Route path="/editar-doacao/:id" element={<EditarDoacao />} />
  <Route path="/item-cadastrado/:id" element={<ItemCadastrado />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
