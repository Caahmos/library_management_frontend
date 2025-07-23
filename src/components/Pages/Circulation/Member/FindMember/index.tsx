import React, { useEffect } from 'react';
import ReturnButton from '../../../../Layouts/ReturnButton';
import { RiUserSearchLine } from "react-icons/ri";

import {
    Container
} from './styles';
import SearchMemberInput from '../../../../Layouts/Circulation/SearchMemberInput';

const FindMember: React.FC = () => {
    useEffect(() => {
        const el = document.getElementById("top");
        el?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <Container id="top">
            <ReturnButton />
            <SearchMemberInput icon={<RiUserSearchLine />} placeholder='Pesquise por um membro' />
        </Container>
    )
};

export default FindMember;