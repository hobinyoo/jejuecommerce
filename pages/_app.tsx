import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/query-core'
import Header from '@components/cs/MainHeader'
import Head from 'next/head'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const App = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  const queryClinet = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  })

  return (
    <QueryClientProvider client={queryClinet}>
      <Head>
        <title>Korea Beef Soup</title>
        <meta name="description" content="Korea Beef Soup" />
      </Head>
      <div css={container}>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  )
}

const container = css`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`
export default App
