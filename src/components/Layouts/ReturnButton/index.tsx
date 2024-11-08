import {
    ArrowBack
} from './styles';
import React from 'react';

import { MdOutlineKeyboardReturn } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const ReturnButton: React.FC = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        const lastPage = localStorage.getItem('lastPage');
        if (lastPage) {
            navigate(lastPage);
        } else {
            navigate(-1);
        }
    };

    return (
        <ArrowBack onClick={handleBackClick}>
            <MdOutlineKeyboardReturn /><span> Voltar</span>
        </ArrowBack>
    )
}

export default ReturnButton;