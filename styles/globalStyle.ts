import { css } from '@emotion/react'

//GlobalStyles

export const GlobalStyle = css`
  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }

  /* reset */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }
  body,
  p,
  a,
  ul,
  li {
    margin: 0;
    padding: 0;
    text-decoration: none;
  }

  li {
    list-style-type: none;
  }

  /* base styles */
  html,
  body {
    overflow-x: hidden;
  }

  @font-face {
    font-family: 'PretendardRegular';
    font-weight: 400;
    font-style: normal;
    src: url('/fonts/woff2/Pretendard-Regular.woff2') format('woff2');
  }
  @font-face {
    font-family: 'PretendardBold';
    font-weight: 700;
    font-style: normal;
    src: url('/fonts/woff2/Pretendard-Bold.woff2') format('woff2');
  }
  @font-face {
    font-family: 'RIDIBatang';
    src: url('/fonts/woff/RIDIBatang.woff') format('woff');
    font-weight: 400;
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'GodoM';
    font-weight: 400;
    font-style: normal;
    src: url('/fonts/woff/GodoM.woff') format('woff');
  }
  @font-face {
    font-family: 'GodoB';
    font-weight: 700;
    font-style: normal;
    src: url('/fonts/woff/GodoB.woff') format('woff');
  }
`
export const toSize = (
  windowWidth: number,
  windowHeight: number,
  input: number
) => {
  const windowWidthDetection = windowWidth > 500 ? 500 : windowWidth
  const scaleVertical = windowHeight / 760
  const scaleHorizontal = windowWidthDetection / 360
  const ratio = windowWidthDetection / windowHeight
  const scale = ratio < 0.6 ? scaleHorizontal : scaleVertical
  return Math.trunc(scale * input)
}

export const toHeightSize = (windowHeight: number, input: number) => {
  const scaleVertical = windowHeight / 760
  return Math.trunc(scaleVertical * input)
}
