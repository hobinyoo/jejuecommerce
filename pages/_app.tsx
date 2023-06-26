import type { AppProps } from 'next/app'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/query-core'
import Head from 'next/head'
import { css } from '@emotion/react'
import { Global } from '@emotion/react'
import { GlobalStyle } from 'styles/globalStyle'
import wrapper from '../store/index'
import AuthProvider from '@components/Auth'
import { useEffect } from 'react'

const App = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  })
  useEffect(() => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [])

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Korea Beef Soup</title>
          <meta name="description" content="Korea Beef Soup" />
        </Head>
        <Global styles={GlobalStyle} />
        <div css={container}>
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  )
}

const container = css`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100); ;
`
export default wrapper.withRedux(App)
