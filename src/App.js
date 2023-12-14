import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login.jsx";
import InsertGoods from "./components/InsertGoods";
import GoodsInfo from "./components/GoodsInfo";
import Header from "./components/Header";
import GoodsEdit from "./components/GoodsEdit";
import UserAdd from "./components/UserAdd";
import UserOutput from "./components/UserOutput";
import UserEdit from "./components/UserEdit";
import TabComponent from './components/Tab';
import Company  from './components/Company';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/UserAdd" element = {<UserAdd />}/>
        <Route path = "/UserOutput" element = {<UserOutput />}/>
        <Route path = "/UserEdit" element = {<UserEdit />}/>
        <Route path="/" element={<Login />} />
        <Route path="/insert-goods" element={<InsertGoods />} />
        <Route path="/goodsinfo" element={<GoodsInfo />} />
        <Route path="/goodsEdit/:id" element={<GoodsEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
