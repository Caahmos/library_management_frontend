import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Pages/Home";
import Layout from "../components/Layouts/Layout";
import Circulation from "../components/Pages/Circulation";
import Catalog from "../components/Pages/Catalog";
import Admin from "../components/Pages/Admin";
import Detail from "../components/Pages/Catalog/Detail";
import AdminList from "../components/Pages/Admin/AdminList";
import { HandleSearchProvider } from "../hooks/useHandleSearch";

const AppRoutes: React.FC = () => {

    return (
        <HandleSearchProvider>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/circulation" element={<Circulation />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/catalog/biblio/detail/:id" element={<Detail />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin/adminlist" element={<AdminList />} />
                </Routes>
            </Layout>
        </HandleSearchProvider>
    );
}

export default AppRoutes;
