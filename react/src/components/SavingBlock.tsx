import styled from "styled-components";
import { Button, Message } from "../styles/forms";
import { AddButton } from "./LessonWordsSection";
import { FC } from "react";

interface Props {
    isSaved: boolean,
    add: () => void,
    addButton?: boolean
}

const SavingBlock: FC<Props> = ({ isSaved, add, addButton = true }) => {
    return (
        <>
            <FlexRow style={{ justifyContent: 'space-between' }}>
                {
                    isSaved ?
                        <div></div>
                        :
                        <Message style={{ fontWeight: '600', alignSelf: 'center' }}>Обязательно сохраните данные!</Message>
                }
                {
                    addButton &&
                    <AddButton style={{ padding: 'unset' }} onClick={add}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26.4px" height="26.4px" viewBox="0 0 24 24" fill="none">
                            <path d="M7.00739 12.0001C7.00739 11.5858 7.34317 11.2501 7.75739 11.2501H11.25V7.75742C11.25 7.3432 11.5858 7.00742 12 7.00742C12.4142 7.00742 12.75 7.3432 12.75 7.75742V11.2501H16.2427C16.6569 11.2501 16.9927 11.5858 16.9927 12.0001C16.9927 12.4143 16.6569 12.7501 16.2427 12.7501H12.75V16.2427C12.75 16.6569 12.4142 16.9927 12 16.9927C11.5858 16.9927 11.25 16.6569 11.25 16.2427V12.7501H7.75739C7.34317 12.7501 7.00739 12.4143 7.00739 12.0001Z" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.31673 3.76882C10.4043 3.42374 13.5957 3.42374 16.6832 3.76882C18.5096 3.97294 19.9845 5.41159 20.1994 7.24855C20.5686 10.4055 20.5686 13.5947 20.1994 16.7516C19.9845 18.5885 18.5096 20.0272 16.6832 20.2313C13.5957 20.5764 10.4043 20.5764 7.31673 20.2313C5.49035 20.0272 4.01545 18.5885 3.8006 16.7516C3.43137 13.5947 3.43137 10.4055 3.8006 7.24855C4.01545 5.41159 5.49035 3.97294 7.31673 3.76882ZM16.5166 5.25954C13.5398 4.92683 10.4602 4.92683 7.48334 5.25954C6.33891 5.38744 5.42286 6.29069 5.29045 7.4228C4.93476 10.4639 4.93476 13.5362 5.29045 16.5773C5.42286 17.7094 6.33891 18.6127 7.48334 18.7406C10.4602 19.0733 13.5398 19.0733 16.5166 18.7406C17.6611 18.6127 18.5771 17.7094 18.7095 16.5773C19.0652 13.5362 19.0652 10.4639 18.7095 7.4228C18.5771 6.29069 17.6611 5.38744 16.5166 5.25954Z" fill="white" />
                        </svg>
                    </AddButton>
                }
            </FlexRow>
            <FlexRow style={{ justifyContent: 'center' }}>
                <Button type="submit" disabled={isSaved}>
                    {
                        isSaved ? 'Сохранено' : 'Сохранить'
                    }
                </Button>
            </FlexRow>
        </>
    )
}

export default SavingBlock;

const FlexRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`