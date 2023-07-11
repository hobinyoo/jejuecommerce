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
    font-weight: 500;
    font-style: normal;
    src: url('/fonts/woff2/Pretendard-Bold.woff2') format('woff2');
  }
`
export const toSize = (
  windowWidth: number,
  windowHeight: number,
  input: number
) => {
  const scaleVertical = windowHeight / 760
  const scaleHorizontal = windowWidth / 360
  const ratio = windowWidth / windowHeight
  const scale = ratio < 0.6 ? scaleHorizontal : scaleVertical
  return Math.trunc(scale * input)
}
