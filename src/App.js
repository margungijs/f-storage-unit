// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import InsertGoods from './components/InsertGoods';
import GoodsInfo from './components/GoodsInfo';
import Header from './components/Header';
import GoodsEdit from './components/GoodsEdit';

function App() {
    const isLoggedIn = localStorage.getItem('token');

    const ProtectedRoute = ({ element, ...props }) => {
        return isLoggedIn ? element : <Navigate to="/" replace />;
    };


    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/insert-goods"
                    element={<ProtectedRoute element={<InsertGoods />} />}
                />
                <Route path="/goodsinfo" element={<ProtectedRoute element={<GoodsInfo />} />} />
                <Route
                    path="/goodsEdit/:id"
                    element={<ProtectedRoute element={<GoodsEdit />} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
