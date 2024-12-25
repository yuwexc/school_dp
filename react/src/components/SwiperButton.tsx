import { useSwiper } from "swiper/react"
import { FC, useEffect, useState } from "react";

interface Props {
    children: string
}

const SwiperButton: FC<Props> = ({ children }) => {

    const swiper = useSwiper();
    const [isLastPage, setIsLastPage] = useState<boolean>(false);

    const onload = () => {
        const handleSlideChange = () => {
            setIsLastPage(swiper.isEnd);
        }

        swiper.on('slideChange', handleSlideChange);

        return () => {
            swiper.off('slideChange', handleSlideChange);
        }
    }

    useEffect(() => onload(), [swiper]);

    const hanldeClick = () => {
        swiper.slideNext();
    }

    if (isLastPage) return null;

    return (
        <button onClick={hanldeClick}>{children}</button>
    )
}

export default SwiperButton;