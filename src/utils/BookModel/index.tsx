import { useTheme } from "../../hooks/useTheme";
import { StyledBookModel } from "./styles"

const BookEmpty = () => {
    const { theme } = useTheme();
    return <StyledBookModel fillColor={theme.colors.white} />
}

export default BookEmpty;