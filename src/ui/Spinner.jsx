import styled, { keyframes } from "styled-components";

const rotate = keyframes`
0% {
  transform: rotate(0deg);
}
100%{
    transform: rotate(360deg);

}
`;

const SpinnerMain = styled.div`
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
  border: solid 0.7rem var(--color-brand-dark);
  border-left: solid 0.7rem var(--color-grey-100);
  opacity: 0.8;
  animation: ${rotate} 1.2s infinite linear;
`;

export default SpinnerMain;
