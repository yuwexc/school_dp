import styled, { keyframes } from "styled-components";
import Filter from "../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { CoursesState, fetchCourses } from "../features/courseSlice";
import CourseCardCatalog from "../components/CourseCardCatalog";
import InfiniteScroll from "react-infinite-scroll-component";
import { t } from "i18next";
import { Error } from "../styles/forms";

const Courses = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { courses, status, error } = useSelector<RootState, CoursesState>((state) => state.courses);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [level, setLevel] = useState<number | ''>('');
    const [category, setCategory] = useState<number | ''>('');

    useEffect(() => {
        dispatch(fetchCourses({
            pageIndex: 1,
            level_id: '',
            category_id: ''
        }));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchCourses({
            pageIndex: pageIndex,
            level_id: level,
            category_id: category
        }));
    }, [pageIndex, level, category, dispatch]);

    const load = () => {
        setPageIndex(pageIndex + 1);
    };

    return (
        <StyledMain>
            <Intro>
                <h1>Курсы английского языка<br />онлайн под ваши цели</h1>
                <p>Комплексные программы под рабочие и жизненные цели: для IT, маркетологов, финансов, жизни за границей и путешествий</p>
            </Intro>
            <CoursesSection>
                <Filter setLevel={setLevel} setCategory={setCategory} />
                {
                    error &&
                    <CoursesBlock>
                        <div>
                            <div>
                                <Error>{t('error')}</Error>
                            </div>
                        </div>
                    </CoursesBlock>
                }
                {
                    status === 'loading' && courses?.courses == null && !error &&
                    <CoursesBlock>
                        <div>
                            <div>
                                <CardLoader />
                                <CardLoader />
                                <CardLoader />
                                <CardLoader />
                                <CardLoader />
                                <CardLoader />
                            </div>
                        </div>
                    </CoursesBlock>
                }
                {
                    courses?.courses &&
                    <CoursesBlock>
                        <InfiniteScroll
                            next={load}
                            dataLength={courses.courses.length}
                            loader={<Loader />}
                            hasMore={pageIndex < courses.totalPages}
                        >
                            {
                                courses.courses.map((course, index) =>
                                    <CourseCardCatalog course={course} key={index} />)
                            }
                        </InfiniteScroll>
                    </CoursesBlock>
                }
            </CoursesSection>
        </StyledMain >
    )
}

export default Courses;

const AnimationLoader = keyframes`
    0%     {background-position: calc(0*100%/3) 50% ,calc(1*100%/3) 50% ,calc(2*100%/3) 50% ,calc(3*100%/3) 50% }
    16.67% {background-position: calc(0*100%/3) 0   ,calc(1*100%/3) 50% ,calc(2*100%/3) 50% ,calc(3*100%/3) 50% }
    33.33% {background-position: calc(0*100%/3) 100%,calc(1*100%/3) 0   ,calc(2*100%/3) 50% ,calc(3*100%/3) 50% }
    50%    {background-position: calc(0*100%/3) 50% ,calc(1*100%/3) 100%,calc(2*100%/3) 0   ,calc(3*100%/3) 50% }
    66.67% {background-position: calc(0*100%/3) 50% ,calc(1*100%/3) 50% ,calc(2*100%/3) 100%,calc(3*100%/3) 0   }
    83.33% {background-position: calc(0*100%/3) 50% ,calc(1*100%/3) 50% ,calc(2*100%/3) 50% ,calc(3*100%/3) 100%}
    100%   {background-position: calc(0*100%/3) 50% ,calc(1*100%/3) 50% ,calc(2*100%/3) 50% ,calc(3*100%/3) 50% }
`

const Loader = styled.div`
    justify-self: center;
    grid-column: 1 / 4;
    height: 30px;
    aspect-ratio: 2.5;
    --_g: no-repeat radial-gradient(farthest-side,#000 90%,#0000);
    background:var(--_g), var(--_g), var(--_g), var(--_g);
    background-size: 20% 50%;
    animation: ${AnimationLoader} 1s infinite linear; 
`

const Animation = keyframes`
    0% {
        background-position: right;
    }
`

const CardLoader = styled.div`
    height: 426px;
    min-width: 328px;
    display: inline-block;
    min-height: 100%;
    border-radius: 12px;
    background: linear-gradient(90deg, #0000 33%, #0001 50%, #0000 66%) #f2f2f2;
    background-size: 300% 100%;
    animation: ${Animation} 1.75s infinite linear;
`

const CoursesBlock = styled.div`
    width: 100%;
    
    & > div > div {
        width: 100%;
        display: grid;
        grid-auto-flow: row;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 24px;

        @media (width <= 1455px) {
            width: 100%;
            justify-items: center;
        }

        @media (425px >= width) {
            gap: 12px;
        }
    }
`

const CoursesSection = styled.section`
    width: 100%;
    max-width: 1384px;
    display: flex;
    flex-direction: row;
    align-items: start;
    gap: 24px;

    @media (max-width: 1296px) {
        flex-direction: column;
        align-items: stretch;
    }
`

const Intro = styled.section`
    width: 100%;
    max-width: 1288px;
    padding: 48px 48px 24px 48px;
    display: flex;
    flex-direction: column;
    align-items: start;

    @media (max-width: 1279px) {
        width: calc(100% - 64px);
        padding: 32px 32px 48px;
    }

    @media (max-width: 767px) {
        width: calc(100% - 48px);
        padding: 24px;
    }

    & > h1 {
        width: 100%;
        margin: 0px 0px 24px;
        white-space: pre-wrap;
        font-weight: 600;
        line-height: 68px;
        font-size: 60px;

        @media (max-width: 1279px) {
            font-size: 36px;
            line-height: 45px;
        }

        @media (max-width: 767px) {
            margin: 0px 0px 30px;
            min-width: 100%;
        }

        @media (max-width: 576px) {
            font-size: 24px;
            line-height: unset;
            margin-bottom: 20px;
        }
    }

    & > p {
        width: 100%;
        max-width: 880px;
        white-space: pre-wrap;
        font-size: 18px;
        margin: 0px 0px 24px;

        @media (max-width: 1279px) {
            font-size: 16px;
            line-height: 24px;
        }

        @media (max-width: 767px) {
            margin: 0px 0px 30px;
        }

        @media (max-width: 576px) {
            margin-bottom: 20px;
        }
    }
`

const StyledMain = styled.main`
    height: 100%;
    padding: 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    background-color: white;

    @media (577px <= width <= 768px) {
        padding: 24px;
        gap: 24px;
    }

    @media (425px <= width <= 576px) {
        padding: 20px;
        gap: 20px;
    }

    @media (425px >= width) {
        padding: 12px;
        gap: 12px;
    }
`