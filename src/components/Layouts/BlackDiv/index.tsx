import { Container } from './styles';
import { useMenu } from '../../../hooks/useOpenMenu';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';

const BlackDiv = () => {
  const { isOpenMenu, open } = useMenu();
  const isMobile = useMediaQuery({ maxWidth: 1000 });

  useEffect(() => {
    open();
  }, [isMobile]);

  return (
    <AnimatePresence>
      {isOpenMenu && isMobile && (
        <Container
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </AnimatePresence>
  );
};

export default BlackDiv;
