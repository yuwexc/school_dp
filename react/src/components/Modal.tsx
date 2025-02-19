import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../store";
import { deleteMyCoursesItem } from "../features/courseSlice";
import { handleModalState } from "../features/modalSlice";

interface Props {
    header: string
    main: string,
    access: number | null,
}

const Modal: FC<Props> = ({ header, main, access }) => {

    const dispatch = useDispatch<AppDispatch>();

    const deleteCourseAccess = () => {
        dispatch(deleteMyCoursesItem(access!));
        dispatch(handleModalState({
            state: false,
            access: null
        }));
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        }
    }, []);

    return (
        <>
            <StyledModal>
                <Header>
                    <h3>{header}</h3>
                </Header>
                <Main>
                    <p>{main}</p>
                    <Confirm onClick={deleteCourseAccess}>Подтвердить</Confirm>
                    <Cancel onClick={() => dispatch(handleModalState({
                        state: false,
                        access: null
                    }))}>Отмена</Cancel>
                </Main>
            </StyledModal>
            <StyledBackground />
        </>
    )
}

export default Modal;

const Button = styled.button`
    margin-top: 14px;
    padding: 15px;
    border-radius: 8px;
    border: 0;
    cursor: pointer;
`

const Cancel = styled(Button)`
    margin-left: 14px;
    background-color: #ffd7d7;
`

const Confirm = styled(Button)`
    background-color: #f4ecf7;
`

const Main = styled.main`
    padding: 24px;
`

const Header = styled.header`
    padding: 24px 24px 15px 24px;
    border-bottom: 1px solid lightgray;
`

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 50%;
    min-width: 300px;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 24px;
    z-index: 999;
`

const StyledBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #1f1f1f8a;
    z-index: 998;
`