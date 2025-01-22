import styled, { keyframes } from "styled-components";

const SmallLoader = () => {
    return (
        <StyledSmallLoader></StyledSmallLoader>
    )
}

export default SmallLoader;

const Animation = keyframes`
    0%,
    100% {
      box-shadow: 0 -3em 0 0.2em, 
      2em -2em 0 0em, 3em 0 0 -1em, 
      2em 2em 0 -1em, 0 3em 0 -1em, 
      -2em 2em 0 -1em, -3em 0 0 -1em, 
      -2em -2em 0 0;
    }
    12.5% {
      box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 
      3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, 
      -2em 2em 0 -1em, -3em 0 0 -1em, 
      -2em -2em 0 -1em;
    }
    25% {
      box-shadow: 0 -3em 0 -0.5em, 
      2em -2em 0 0, 3em 0 0 0.2em, 
      2em 2em 0 0, 0 3em 0 -1em, 
      -2em 2em 0 -1em, -3em 0 0 -1em, 
      -2em -2em 0 -1em;
    }
    37.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
       3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, 
       -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    50% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
       3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, 
       -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    62.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
       3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, 
       -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
    }
    75% {
      box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 
      3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, 
      -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
    }
    87.5% {
      box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 
      3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, 
      -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
    }
`;

const StyledSmallLoader = styled.div`
    color: #fff;
    font-size: 3px;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    position: relative;
    text-indent: -9999em;
    animation: ${Animation} 1.3s infinite linear;
    transform: translateZ(0);
`;