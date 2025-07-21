import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import styled from "styled-components";

const AccordionContainer = styled.div`
  margin-left: 25px;
  color: ${(props) => props.theme.colors.white};

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-top: 5px;
    margin-bottom: 15px;
    font-size: 14px;
  }
`;

interface MotionAccordionProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const MotionAccordion: React.FC<MotionAccordionProps> = ({ isOpen, children }) => {
  return (
    <AccordionContainer>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: "auto", opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </AccordionContainer>
  );
};

export default MotionAccordion;
