import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import Message from "../components/Layouts/Message";


const Routes: React.FC = () => {
    const { logged } = useAuth();
    return (
        <Router>
            <Message />
            {logged
                ? <AppRoutes />
                : <AuthRoutes />
            }
        </Router>
    );
}

export default Routes;
