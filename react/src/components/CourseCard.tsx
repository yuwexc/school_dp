import styled, { keyframes } from "styled-components";
import { CourseItemInterface } from "../interfaces/course";
import { FC } from "react";
import { Link } from "react-router-dom";
import { LevelColors } from "../interfaces/level";
import Enrolled from "./Enrolled";
import Expelled from "./Expelled";
import Requested from "./Requested";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ModalInterface } from "../interfaces/modal";
import Modal from "./Modal";

interface Props {
    course: CourseItemInterface
}

const CourseCard: FC<Props> = ({ course }) => {

    const modal = useSelector<RootState, ModalInterface>((state) => state.modal.modal);

    return (
        <Article>
            <IMG $src={course.image} />
            <Info>
                <h2>{course.course_name}</h2>
                <Description>{course.course_description}</Description>
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
                        course.category && <LinkToResources to={'/topics'}>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="16px" height="16px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000" stroke="none">
                                    <path d="M3593 4755 c-144 -40 -207 -88 -499 -379 -316 -316 -369 -392 -393 -567 -19 -138 12 -271 91 -391 55 -83 543 -571 626 -626 119 -78 247 -108 387 -91 176 22 253 75 571 393 347 348 389 416 389 636 0 230 -25 271 -395 640 -295 295 -341 332 -459 374 -74 26 -244 32 -318 11z" />
                                    <path d="M994 4630 c-148 -21 -238 -64 -339 -165 -79 -79 -126 -160 -152 -261 -16 -60 -18 -120 -18 -464 0 -444 3 -471 65 -596 75 -152 230 -270 396 -299 112 -20 766 -20 879 0 228 41 409 222 450 450 20 113 20 767 0 879 -30 167 -146 321 -299 396 -45 22 -103 45 -131 51 -61 14 -764 21 -851 9z" />
                                    <path d="M941 2275 c-205 -38 -380 -204 -438 -416 -16 -56 -18 -113 -18 -469 0 -450 4 -483 68 -604 41 -79 154 -192 233 -233 120 -64 155 -68 594 -68 444 0 471 3 596 65 153 75 269 229 299 396 20 112 20 766 0 879 -37 206 -187 374 -395 441 -48 15 -104 18 -460 20 -311 2 -422 0 -479 -11z" />
                                    <path d="M3291 2275 c-224 -41 -406 -224 -446 -450 -20 -113 -20 -767 0 -879 30 -167 146 -321 299 -396 125 -62 152 -65 596 -65 439 0 474 4 594 68 79 41 192 154 233 233 64 120 68 155 68 594 0 444 -3 471 -65 596 -75 153 -229 269 -396 299 -109 20 -775 19 -883 0z" />
                                </g>
                            </svg>
                            <p>{course.category}</p>
                        </LinkToResources>
                    }
                    <Author>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="16px" height="16px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#fff" stroke="none">
                                <path d="M2340 4984 c-19 -2 -82 -11 -140 -20 -973 -145 -1771 -876 -2003 -1835 -52 -211 -62 -307 -62 -569 0 -312 24 -473 111 -742 241 -747 825 -1330 1572 -1572 273 -88 430 -111 752 -110 229 1 270 3 400 27 516 93 975 335 1330 703 362 374 579 811 667 1339 25 156 25 554 0 710 -93 559 -336 1025 -733 1404 -294 280 -642 478 -1029 585 -218 60 -350 78 -605 81 -124 2 -241 1 -260 -1z m431 -355 c710 -72 1340 -512 1655 -1154 379 -775 247 -1684 -338 -2324 -27 -29 -50 -52 -52 -50 -1 2 -20 33 -41 69 -175 295 -464 497 -792 555 -125 21 -1157 22 -1280 1 -334 -59 -623 -261 -798 -556 -21 -36 -40 -67 -41 -69 -2 -2 -25 21 -52 50 -453 496 -641 1161 -511 1816 207 1046 1188 1771 2250 1662z" />
                                <path d="M2380 3946 c-178 -38 -333 -121 -468 -250 -187 -180 -282 -401 -283 -658 0 -133 11 -204 46 -308 102 -301 344 -525 652 -607 141 -37 326 -37 467 0 318 85 555 312 662 637 26 80 28 96 29 260 0 153 -3 185 -23 253 -94 327 -345 574 -672 662 -87 23 -321 29 -410 11z" />
                            </g>
                        </svg>
                        <p style={{ color: 'white' }}>{course.author.first_name} {course.author.last_name}</p>
                    </Author>
                </Characteristics>
                <Actions>
                    <div style={{ width: '100%', display: 'flex', gap: '8px' }}>
                        <Progress $progress={course.progress} />
                        <p style={{ alignSelf: 'center', textWrap: 'nowrap' }}>{course.progress}%</p>
                    </div>
                    <div style={{ display: 'flex', minHeight: '35px', alignItems: 'stretch', paddingTop: '8px' }}>
                        {
                            course.access!.access_status === 'requested' && <Requested access={course.access!.id_course_access} />
                        }
                        {
                            course.access!.access_status === 'expelled' && <Expelled />
                        }
                        {
                            course.access!.access_status === 'enrolled' && <Enrolled url={'/my-courses/' + course.id_course} />
                        }
                    </div>
                </Actions>
            </Info>
            {
                modal.state && <Modal
                    header={'Подтверждение удаления заявки'}
                    main={'Вы действительно хотите отозвать заявку?'}
                    access={modal.access}
                />
            }
        </Article>
    )
}

export default CourseCard;

const ProgressAnimation = keyframes<{ $progress: number }>`
    0% {
        width: 0%;
    }

    100% {
        ${props => props.$progress}
    }
`

const Progress = styled.div<{ $progress: number }>`
    position: relative;
    height: 8px;
    width: 100%;
    align-self: center;
    background-color: lightgray;
    border-radius: 4px;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 8px;
        width: ${props => props.$progress}%;
        background-color: green;
        border-radius: 4px;
        animation: ${ProgressAnimation} 0.75s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
    }
`

const Actions = styled.div`
    padding-top: 12px;
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
`

const Author = styled.div`
    text-wrap: nowrap;
    background-color: #2d2d2d;
    padding: 6px;
    border-radius: 6px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
`

const LinkToResources = styled(Link) <{ $backgroundColor?: string }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    text-wrap: nowrap;
    padding: 6px;
    border-radius: 6px;
    background-color: ${props => props.$backgroundColor ? props.$backgroundColor : '#d9d9d9'};
    color: white;
    font-weight: 400;
`

const Characteristics = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 4px;
`

const Description = styled.p`
    min-height: 48px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Info = styled.div`
    width: 100%;
    min-width: 192px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 24px;
`

const IMG = styled.div <{ $src: string | null }>`
    min-width: 240px;
    background-image: url(${props => props.$src == null ? '/images/4.jpeg' : props.$src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`

const Article = styled.article`
    width: calc(50% - 14px);
    overflow: hidden;
    min-width: 480px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    border: 1px solid lightgray;
    border-radius: 24px;
`