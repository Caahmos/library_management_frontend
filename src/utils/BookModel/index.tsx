import { useTheme } from "../../hooks/useTheme";
import { StyledBookModel } from "./styles"
import React from "react";

const BookEmpty: React.FC<{rank: number}> = ({rank}) => {
    const { theme } = useTheme();
    return <StyledBookModel fillColor={theme.colors.white} rank={rank}/>
}

export default BookEmpty;