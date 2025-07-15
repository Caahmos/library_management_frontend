import React from "react";
import { Container } from "./styles";
import type { ViewAllClassifiesRequest } from "../../../model/Member/MemberClassifyDM/ViewAllClassifiesRequest";

const Tag: React.FC<ViewAllClassifiesRequest> = ({description}) => {
    return (
        <Container>
            <p>{description}</p>
        </Container>
    )
};

export default Tag;