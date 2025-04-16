import React from 'react';
import ReturnButton from '../../../Layouts/ReturnButton';

import {
    Container,
    FormContainer
} from './styles';
import CreateBookForm from '../../../Layouts/Forms/Catalog/CreateBookForm';

const CreateBook: React.FC = () => {
    return (
        <Container>
            <ReturnButton />
            <FormContainer>
                <CreateBookForm button_text='Criar Livro' handleSubmit={() => {}}/>
            </FormContainer>
        </Container>
    )
};

export default CreateBook;