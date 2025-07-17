import React, { useEffect, useState } from 'react';
import ReturnButton from '../../../Layouts/ReturnButton';
import { RiUserSearchLine } from "react-icons/ri";

import {
    Container
} from './styles';
import SearchCheckinInput from '../../../Layouts/Circulation/SearchCheckinInput';

const Checkin: React.FC = () => {
    useEffect(() => {
        const el = document.getElementById("top");
        el?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <Container id="top">
            <ReturnButton />
            <SearchCheckinInput/>
        </Container>
    )
};

export default Checkin;