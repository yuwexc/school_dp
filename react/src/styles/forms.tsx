import styled from "styled-components";

export const Title = styled.h2`
    font-size: 36px;
    font-weight: 700;
`

export const Button = styled.button`
    border: 0;
    border-radius: 10px;
    background-color: #2d2d2d;
    color: #f9f9f9;
    width: fit-content;
    padding: 13px 35px;
    cursor: pointer;
    font-size: 14px;
    min-height: 40px;
    min-width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    &:disabled {
        cursor: unset;
        background-color: gray;
    }
`

export const Input = styled.input`
    border: 2px solid #d9d9d9;
    border-radius: 5px;
    padding: 10px;
    font-weight: 500;
`

export const Select = styled.select`
    border: 2px solid #d9d9d9;
    border-radius: 5px;
    padding: 10px;
    font-weight: 500;
    outline: 0;
`

export const Message = styled.p`
    color: #f22613;
    font-weight: 400;
    align-self: flex-start;
    max-width: 392px;
    text-align: left;
`

export const Annotation = styled.p`
    display: none;
    position: absolute;
    bottom: 2.2rem;
    background-color: white;
    box-shadow: 0 0 30px 0 lightgray;
    padding: 10px;
    border-radius: 10px;
    color: grey;
    font-size: 14px;
    align-self: flex-start;
    text-align: left;
    width: 60vw;
    max-width: 392px;
    z-index: 9999;
    border: 1px solid red;

    @media (width <=663px) {
        left: 0;
    }
`

export const Span = styled.span`
    border: 1px solid #ff00007b;
    margin-left: 10px;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    box-shadow: 0 0 15px 0 lightgray;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    font-weight: 500;
    font-size: 11px;
    cursor: pointer;

    &:hover ${Annotation} {
        display: block;
    }
`

export const Error = styled(Message)`
    align-self: center;
`