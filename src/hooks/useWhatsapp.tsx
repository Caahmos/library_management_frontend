import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { io, Socket } from "socket.io-client";

const apiUrl = import.meta.env.VITE_API_URL;

interface WhatsappStatus {
    status: string | null;
    message: string;
    connected: boolean;
}

interface WhatsappContextProps {
    socket: Socket | null;
    status: WhatsappStatus;
    qrCode: string | null;
    refreshStatus: () => void;
}

const WhatsappContext = createContext<WhatsappContextProps | undefined>(undefined);

export const WhatsappProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [status, setStatus] = useState<WhatsappStatus>({
        status: null,
        message: "Carregando...",
        connected: false
    });
    const [qrCode, setQrCode] = useState<string | null>(null);

    const refreshStatus = (s: Socket | null = socket) => {
        if (!s) {
            console.log("⚠️ Socket ainda não inicializado para refresh");
            return;
        }
        console.log("🔁 Solicitando estado atual do WhatsApp...");
        s.emit("request-whatsapp-state");
    };

    useEffect(() => {
        const s = io(apiUrl, { transports: ["websocket"] });

        s.on("connect", () => {
            console.log("✅ Conectado ao Socket.IO:", s.id);
            setSocket(s);
            refreshStatus(s);
        });

        // Sempre loga quando um status chega
        s.on("whatsapp-status", (data: WhatsappStatus) => {
            console.log("📌 [EVENTO] whatsapp-status recebido:", data);
            setStatus(data);
        });

        // Sempre loga quando um QR Code chega
        s.on("whatsapp-qr", (data: { qrCode: string; message: string }) => {
            console.log("📌 [EVENTO] whatsapp-qr recebido:", data);
            setQrCode(data.qrCode);
            setStatus(prev => ({ ...prev, message: data.message }));
        });

        s.on("whatsapp-error", (data: { message: string }) => {
            console.log("❌ [EVENTO] whatsapp-error recebido:", data);
            setStatus(prev => ({ ...prev, message: `❌ Erro: ${data.message}` }));
        });

        return () => {
            s.disconnect();
            console.log("⚡ Socket desconectado");
        };
    }, []);

    return (
        <WhatsappContext.Provider value={{ socket, status, qrCode, refreshStatus }}>
            {children}
        </WhatsappContext.Provider>
    );
};

export const useWhatsapp = () => {
    const context = useContext(WhatsappContext);
    if (!context) throw new Error("useWhatsapp deve ser usado dentro do WhatsappProvider");
    return context;
};