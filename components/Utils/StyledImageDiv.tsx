import { styled } from "twin.macro"

interface StyledImageDivProps {
    src?: string;
}

const StyledImageDiv = styled.div<StyledImageDivProps>`
    background-image:url(${props => props.src});
    background-size:cover;
    background-position: 50% 50%;
    width: 100vw;
    max-width: 360px;
    padding-top: 61%; 
`

export default StyledImageDiv;