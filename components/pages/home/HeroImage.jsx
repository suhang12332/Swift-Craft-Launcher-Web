import styled, { css, keyframes } from 'styled-components';
import Image from 'next/image';
import HardwareLockup from './HardwareLockup';
import { useSite } from '@/components/common/Site';
import { mediaQueries } from '@/styles/breakpoints';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const scaleBlurIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.75);
    filter: blur(32px);
  }
  to {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
`;

const SceneWrap = styled.div`
  position: relative;
  animation: ${scaleBlurIn} 500ms 750ms cubic-bezier(0, 0, 0.2, 1);
  animation-fill-mode: both;
  transform-origin: bottom center;
  margin-top: 6%;

  img {
    position: relative;
    width: 100%;
    height: auto;
  }
`;
const ImageWrap = styled.div`
  position: relative;
  max-width: 988px;
  margin: 0 auto;
  z-index: 1;

  @media ${mediaQueries.md} {
    width: 82%;
  }
`;
const colorFlairPiece = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #4f95ff;
  transform-origin: bottom center;

  @media ${mediaQueries.md} {
    width: 20vw;
    height: 20vw;
    filter: blur(10vw);
  }
`;
const ColorFlair = styled.div`
  ${colorFlairPiece}
  animation: ${rotate} 5000ms linear infinite;
  filter: blur(100px);

  &:before {
    content: '';
    display: block;
    ${colorFlairPiece};
    background: #b120bd;
    top: 50%;
    left: auto;
    right: 50%;
  }

  &:after {
    content: '';
    display: block;
    ${colorFlairPiece};
    background: #44cee3;
    top: 50%;
    left: 50%;
  }
`;
const ColorFlair1 = styled(ColorFlair)`
  && {
    top: 0px;
    left: 100px;
    animation-duration: 4000ms;
  }
`;
const ColorFlair2 = styled(ColorFlair)`
  && {
    top: -100px;
    left: calc(50% - 100px);
    animation-duration: 6000ms;
    animation-direction: reverse;
  }
`;
const ColorFlair3 = styled(ColorFlair)`
  && {
    top: 0px;
    left: auto;
    right: 100px;
    animation-duration: 5000ms;
  }
`;
const StyledHardwareLockup = styled(HardwareLockup)`
  margin-top: -45%;
  margin-left: -112px;
  margin-right: -112px;

  @media ${mediaQueries.md} {
    margin-top: -37%;
    margin-left: 0;
    margin-right: 0;
  }
`;

const HeroImage = ({ percentage = 0 }) => {
  const { colorScheme = 'light', breakpoint } = useSite();
  const adjustedPercentage =
    (Math.min(Math.max(percentage - (breakpoint === 'xs' ? 0.2 : 0), 1), 1.2) -
      1) *
    5;

  return (
    <SceneWrap>
      <ColorFlair1 />
      <ColorFlair2 />
      <ColorFlair3 />
      <ImageWrap
        style={{
          transform: `translateY(${adjustedPercentage * 12.5}%) scale(${
            1 + (1 - adjustedPercentage) * 0.1
          })`,
        }}
      >
        <Image
          width={987.275}
          height={580.75}
          src={`/app-window-${colorScheme}.png`}
          alt="Swift Craft Launcher screenshot"
        />
      </ImageWrap>
      <StyledHardwareLockup
        style={{
          opacity: adjustedPercentage,
          transform: `translateY(-${adjustedPercentage * 15}%) scale(${
            1 + (1 - adjustedPercentage) * -0.1
          })`,
        }}
      />
    </SceneWrap>
  );
};

export default HeroImage;
