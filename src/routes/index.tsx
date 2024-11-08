import React from "react";
import { useAuth } from "../hooks/useAuth";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import Message from "../components/Layouts/Message";


const Routes: React.FC = () => {
    const { logged } = useAuth();
    return (
        <>
            <Message />
            {logged
                ? <AppRoutes />
                : <AuthRoutes />
            }
        </>
    );
}

export default Routes;
