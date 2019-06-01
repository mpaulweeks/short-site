import {keyframes} from 'styled-components';

export const FlexColumnMixin = `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: no-wrap;
`;

export const AnimateRotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

export const AnimateShake = keyframes`
  0% {
    transform: translateY(0%);
  }
  25% {
    transform: translateY(-20%);
  }
  50% {
    transform: translateY(0%);
  }
  75% {
    transform: translateY(20%);
  }
`;