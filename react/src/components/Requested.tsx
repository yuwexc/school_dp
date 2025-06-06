import { FC } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../store";
import { handleModalState } from "../features/modalSlice";
import { useTranslation } from "react-i18next";

interface Props {
    access: string
}

const Requested: FC<Props> = ({ access }) => {

    const { t } = useTranslation();

    const dispatch = useDispatch<AppDispatch>();

    const handleClick = () => {
        dispatch(handleModalState({
            state: true,
            access: access
        }));
    }

    return (
        <Button onClick={handleClick}>
            <p>{t('access.requested')}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.62542 9.63124L5.30619 6.75816C5.26575 6.39418 5.26575 6.02684 5.30619 5.66286L5.32895 5.45796C5.57044 3.28457 7.27904 1.56492 9.45083 1.30941C9.81565 1.26649 10.1843 1.26649 10.5491 1.30941C12.7209 1.56492 14.4295 3.28458 14.671 5.45797L14.6937 5.66286C14.7342 6.02684 14.7342 6.39418 14.6937 6.75816L14.4128 9.28682C14.3929 9.46552 14.256 9.60783 14.0799 9.64411C13.0843 9.84926 12.1659 10.2658 11.3737 10.8448C11.2996 10.899 11.2099 10.9281 11.118 10.9256C9.55153 10.8828 7.98317 10.93 6.42073 11.0672L5.28628 11.1668C4.76155 11.2129 4.33686 11.6127 4.2593 12.1338C3.92708 14.3656 3.92708 16.6343 4.2593 18.8662C4.33686 19.3872 4.76155 19.7871 5.28628 19.8332L6.42073 19.9328C7.36679 20.0159 8.31501 20.0659 9.26368 20.083C9.40262 20.0855 9.52998 20.1596 9.60504 20.2765C9.82379 20.6172 10.0713 20.9378 10.3441 21.2347C10.4653 21.3667 10.377 21.5883 10.1977 21.5892C8.89383 21.5953 7.58969 21.5412 6.28951 21.427L5.15506 21.3274C3.93931 21.2206 2.95534 20.2942 2.77565 19.0871C2.42163 16.7088 2.42163 14.2912 2.77565 11.9129C2.95534 10.7058 3.93931 9.77931 5.15506 9.67255L5.62542 9.63124ZM9.62609 2.79914C9.87448 2.76992 10.1254 2.76992 10.3738 2.79914C11.8524 2.97309 13.0157 4.1439 13.1801 5.62361L13.2029 5.82851C13.2311 6.08239 13.2311 6.33862 13.2029 6.59251L12.8789 9.50814C10.9618 9.37772 9.03808 9.37772 7.12097 9.50814L6.79701 6.59251C6.7688 6.33862 6.7688 6.08239 6.79701 5.82851L6.81978 5.62361C6.98419 4.1439 8.14747 2.97309 9.62609 2.79914Z" fill="black" />
                <path d="M16.25 15C16.25 14.5858 15.9142 14.25 15.5 14.25C15.0857 14.25 14.75 14.5858 14.75 15V16.7727C14.75 17.0127 14.8648 17.2381 15.0588 17.3793L16.0588 18.1065C16.3938 18.3502 16.8629 18.2761 17.1065 17.9411C17.3501 17.6061 17.2761 17.1371 16.9411 16.8934L16.25 16.3908V15Z" fill="black" />
                <path fillRule="evenodd" clipRule="evenodd" d="M15.5 22C18.5375 22 21 19.5375 21 16.5C21 13.4624 18.5375 11 15.5 11C12.4624 11 9.99995 13.4624 9.99995 16.5C9.99995 19.5375 12.4624 22 15.5 22ZM15.5 20.5C17.7091 20.5 19.5 18.7091 19.5 16.5C19.5 14.2908 17.7091 12.5 15.5 12.5C13.2908 12.5 11.5 14.2908 11.5 16.5C11.5 18.7091 13.2908 20.5 15.5 20.5Z" fill="black" />
            </svg>
        </Button>
    )
}

export default Requested;

const Button = styled.button`
    min-width: 160px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: #fdebd0;
    border: 1px solid lightsalmon;
    border-radius: 18px;
    font-size: 14px;
    cursor: pointer;

    @media (576px >= width) {
        height: 35px;
        min-width: 130px;
    }
`