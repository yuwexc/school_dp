import { useSwiper } from "swiper/react"
import { FC, useEffect, useState } from "react";
import { Button } from "../styles/forms";
import styled from "styled-components";

interface Props {
    children: string,
}

const SwiperButtonPrev: FC<Props> = ({ children }) => {

    const swiper = useSwiper();
    const [isFirstPage, setisFirstPage] = useState<boolean>(false);

    const onload = () => {
        const handleSlideChange = () => {
            setisFirstPage(swiper.isBeginning);
        }

        swiper.on('slideChange', handleSlideChange);

        return () => {
            swiper.off('slideChange', handleSlideChange);
        }
    }

    useEffect(() => onload(), [swiper]);

    const hanldeClick = () => {
        swiper.slidePrev();
    }

    if (isFirstPage) return null;

    return (
        <BackButton onClick={hanldeClick}>{children}</BackButton>
    )
}

export default SwiperButtonPrev;

const BackButton = styled(Button)`
    border: 2px solid #2d2d2d;
    background-color: #f9f9f9;
    color: #2d2d2d;
    min-width: unset;
`