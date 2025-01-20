import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";

const StudentLayout = () => {
    if (!localStorage.getItem('ACCESS_TOKEN')) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <StyledStudentLayout>
                <aside>

                </aside>
                <main>
                    <Outlet />
                </main>
            </StyledStudentLayout>
        </>
    )
}

export default StudentLayout;

const StyledStudentLayout = styled.div`
    width: 100%;
    min-height: 100dvh;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: stretch;
`