import React, { useState } from 'react';
import ReturnButton from '../../../../Layouts/ReturnButton';

import {
    Container
} from './styles';
import SearchMemberInput from '../../../../Layouts/Circulation/SearchMemberInput';

const FindMember: React.FC = () => {
   

    return (
        <Container>
            <ReturnButton />
            <SearchMemberInput placeholder='Pesquise por um membro'/>
        </Container>
    )
};

export default FindMember;