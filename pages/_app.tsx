import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/query-core'
import { SessionProvider } from 'next-auth/react'
import Header from '@components/Header'
import Head from 'next/head'
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClinet = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  })

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClinet}>
        <Head>
          <title>Commerce Service</title>
          <meta name="description" content="commerce service" />
        </Head>
        <div className="md:px-36 px-9">
          <Header />
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </SessionProvider>
  )
}
