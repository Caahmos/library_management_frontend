import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Pages/Auth/Login";

const AuthRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
        </Routes>
    );
}

export default AuthRoutes;
