import styled from "styled-components";
import backgroundImage from './MediaFiles/FrontpageBackground.png';

// Container for everything but the navbar:
export const Page = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    position: relative;
    padding: 76px 0 20px 0;
    min-height: 100vh;
    overflow-x: hidden;

    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
`