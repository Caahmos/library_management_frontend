import React from "react";
import { Container, Content, Line, LineGroup } from "./styles";
import type { ViewAllClassifiesRequest } from "../../../../model/Member/MemberClassifyDM/ViewAllClassifiesRequest";

const CategoryTag: React.FC<ViewAllClassifiesRequest> = ({ description, color1, color2 }) => {
    return (
        <Content>
            <LineGroup>
                {color1 && <Line color1={color1} />}
                {color2 && <Line color1={color2} />}
            </LineGroup>
            <Container color1={color1} color2={color2}>
                <p>{description}</p>
            </Container>
        </Content>
    )
};

export default CategoryTag;