import React from 'react';

import {
    Container,
    FormContainer
} from './styles';
import ReturnButton from '../../../Layouts/ReturnButton';
import RegisterAdminForm from '../../../Layouts/Forms/Admin/RegisterAdminForm';

const CreateAdmin: React.FC = () => {
    return (
        <Container>
            <ReturnButton/>
            <FormContainer>
                    <RegisterAdminForm />
            </FormContainer>
        </Container>
    )
};

export default CreateAdmin;