import styled from "styled-components";
import { Title } from "./forms";

export const LessonSectionTitle = styled(Title)`
    font-size: 103px;

    @media (max-width: 1024px) {
        font-size: 84px;
    }

    @media (max-width: 768px) {
        font-size: 72px;
    }

    @media (max-width: 576px) {
        font-size: 48px;
    }

    @media (max-width: 426px) {
        font-size: 40px;
    }
`