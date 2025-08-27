import {
    Container
} from './styles';
import { useMenu } from '../../../hooks/useOpenMenu';
import { AnimatePresence } from 'framer-motion';

const BlackDiv = () => {
    const { isOpenMenu } = useMenu();

    return (
        <AnimatePresence>
            {
                isOpenMenu &&
                <Container
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                />
            }
        </AnimatePresence>
    )
};

export default BlackDiv;