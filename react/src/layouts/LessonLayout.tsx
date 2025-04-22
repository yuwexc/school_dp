import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";

const LessonLayout = () => {

    if (!localStorage.getItem('ACCESS_TOKEN')) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <StyledLessonLayout>
                <Outlet />
            </StyledLessonLayout>
        </>
    )
}

export default LessonLayout;

export const StyledLessonLayout = styled.div`
    min-height: 100dvh;
    display: flex;
    flex-direction: row;
    align-items: stretch;
`