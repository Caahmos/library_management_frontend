import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Pages/Home";
import Layout from "../components/Layouts/Layout";
import Circulation from "../components/Pages/Circulation";
import Catalog from "../components/Pages/Catalog";
import Admin from "../components/Pages/Admin";
import Detail from "../components/Pages/Catalog/Detail";

const AppRoutes: React.FC = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/circulation" element={<Circulation />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/catalog/biblio/detail/:id" element={<Detail />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Layout>
    );
}

export default AppRoutes;
