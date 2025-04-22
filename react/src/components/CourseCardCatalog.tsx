import { FC } from "react";
import { CourseItemInterface } from "../interfaces/course";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Characteristics, LinkToResources } from "./CourseCard";
import { LevelColors } from "../interfaces/level";

interface Props {
    course: CourseItemInterface
}

const CourseCardCatalog: FC<Props> = ({ course }) => {

    return (
        <Card>
            <IMG $src={course.image} />
            <Info>
                <h2 style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical'
                }}>{course.course_name.charAt(0).toUpperCase() + course.course_name.slice(1)}</h2>
                <Characteristics>
                    <LinkToResources
                        to={'/courses'}
                        $backgroundColor={LevelColors.get(course.level.level_code)!}>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="16px" height="16px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000" stroke="none">
                                <path d="M3963 4625 c-170 -46 -304 -181 -348 -350 -13 -52 -15 -260 -15 -1715 0 -1435 2 -1663 15 -1713 47 -179 198 -323 374 -357 69 -13 512 -13 582 0 182 34 344 196 379 379 14 74 14 3308 0 3382 -34 176 -177 327 -355 374 -81 21 -554 21 -632 0z" />
                                <path d="M2238 3735 c-120 -33 -240 -127 -296 -233 -65 -122 -62 -54 -62 -1387 0 -1041 2 -1219 15 -1268 47 -179 198 -323 374 -357 69 -13 512 -13 582 0 182 34 344 196 379 379 6 35 10 480 10 1255 0 1323 3 1256 -62 1378 -36 69 -135 165 -202 197 -94 46 -135 51 -421 50 -187 -1 -284 -5 -317 -14z" />
                                <path d="M488 2837 c-163 -56 -282 -190 -317 -355 -7 -36 -11 -293 -11 -815 0 -644 2 -772 15 -820 47 -179 198 -323 374 -357 69 -13 512 -13 582 0 184 34 345 197 379 382 7 36 10 328 8 834 -3 774 -3 779 -25 837 -49 129 -155 238 -280 288 -56 23 -70 24 -358 26 -291 3 -302 2 -367 -20z" />
                            </g>
                        </svg>
                        <p>{course.level.level_code}</p>
                    </LinkToResources>
                    {
                        course.category && <LinkToResources to={''}>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="16px" height="16px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000" stroke="none">
                                    <path d="M3593 4755 c-144 -40 -207 -88 -499 -379 -316 -316 -369 -392 -393 -567 -19 -138 12 -271 91 -391 55 -83 543 -571 626 -626 119 -78 247 -108 387 -91 176 22 253 75 571 393 347 348 389 416 389 636 0 230 -25 271 -395 640 -295 295 -341 332 -459 374 -74 26 -244 32 -318 11z" />
                                    <path d="M994 4630 c-148 -21 -238 -64 -339 -165 -79 -79 -126 -160 -152 -261 -16 -60 -18 -120 -18 -464 0 -444 3 -471 65 -596 75 -152 230 -270 396 -299 112 -20 766 -20 879 0 228 41 409 222 450 450 20 113 20 767 0 879 -30 167 -146 321 -299 396 -45 22 -103 45 -131 51 -61 14 -764 21 -851 9z" />
                                    <path d="M941 2275 c-205 -38 -380 -204 -438 -416 -16 -56 -18 -113 -18 -469 0 -450 4 -483 68 -604 41 -79 154 -192 233 -233 120 -64 155 -68 594 -68 444 0 471 3 596 65 153 75 269 229 299 396 20 112 20 766 0 879 -37 206 -187 374 -395 441 -48 15 -104 18 -460 20 -311 2 -422 0 -479 -11z" />
                                    <path d="M3291 2275 c-224 -41 -406 -224 -446 -450 -20 -113 -20 -767 0 -879 30 -167 146 -321 299 -396 125 -62 152 -65 596 -65 439 0 474 4 594 68 79 41 192 154 233 233 64 120 68 155 68 594 0 444 -3 471 -65 596 -75 153 -229 269 -396 299 -109 20 -775 19 -883 0z" />
                                </g>
                            </svg>
                            <p>{course.category.category_name}</p>
                        </LinkToResources>
                    }
                </Characteristics>
                <Link style={{ color: '#6c5ce7', fontWeight: '600', marginTop: '6px' }} to={'/courses/' + course.id_course}>
                    Подробнее
                </Link>
            </Info>
        </Card>
    )
}

export default CourseCardCatalog;

const Info = styled.div`
    width: calc(100% - 48px);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const IMG = styled.div <{ $src: string | null }>`
    min-width: 240px;
    min-height: 280px;
    background-image: url(${props => props.$src == null ? '/images/4.jpeg' : props.$src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    @media (377px <= width <= 768px) {
        height: 300px;
    }

    @media (376px >= width) {
        height: 200px;
    }
`

const Card = styled.div`
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f3f3f3;
    border-radius: 12px;

    &:nth-child(3n + 2) {
        flex-direction: column-reverse;
        justify-content: space-between;
    }

    @media (max-width: 1296px) {
        &:nth-child(3n + 2) {
            flex-direction: column;
            justify-content: unset;
        }
    }
`