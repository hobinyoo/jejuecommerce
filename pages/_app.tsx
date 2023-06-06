import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/query-core'
import Header from '@components/cs/MainHeader'
import Head from 'next/head'
import styled from '@emotion/styled'
export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
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
      <Container>
        <Component {...pageProps} />
      </Container>
    </QueryClientProvider>
  )
}

const Container = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
`
