import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login.jsx";
import InsertGoods from "./components/InsertGoods";
import GoodsInfo from "./components/GoodsInfo";
import Header from "./components/Header";

function App() {

    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/insert-goods" element={<InsertGoods />} />
                <Route path="/goodsinfo" element={<GoodsInfo />} />
            </Routes>
        </Router>
    );
}

export default App;
