import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/query-core'

export default function App({ Component, pageProps }: AppProps) {
  const queryClinet = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  })
  return (
    <QueryClientProvider client={queryClinet}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
