import React from 'react';
import ReturnButton from '../../../../Layouts/ReturnButton';
import { RiUserForbidLine } from "react-icons/ri";

import {
    Container
} from './styles';
import SearchBlockedMembers from '../../../../Layouts/Circulation/SearchBlockedMembers';

const BlockedMembers: React.FC = () => {
   

    return (
        <Container>
            <ReturnButton />
            <SearchBlockedMembers icon={<RiUserForbidLine/>} placeholder='Pesquise por um membro'/>
        </Container>
    )
};

export default BlockedMembers;