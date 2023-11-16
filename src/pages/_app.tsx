import type { AppProps } from 'next/app'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/query-core'
import Head from 'next/head'
import { Global } from '@emotion/react'
import { GlobalStyle } from 'styles/globalStyle'
import wrapper, { useAppDispatch } from '../store/index'
import AuthProvider from 'src/components/Auth'
import { useEffect } from 'react'
import Layout from '@components/cs/Layout'
import { setWindowSize } from 'src/store/features/windowSizeSlice'

const App = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  const dispatch = useAppDispatch()
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  })

  useEffect(() => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [])

  useEffect(() => {
    if (typeof window === 'object') {
      const handleResize = () => {
        dispatch(
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          })
        )
      }
      if (window.innerWidth > 500)
        return alert('모바일 환경에서 실행 가능합니다.')
      handleResize() // 컴포넌트가 처음 마운트될 때 초기 윈도우 크기 설정
      window.addEventListener('resize', handleResize) // 윈도우 크기 변경 이벤트 처리
      return () => {
        window.removeEventListener('resize', handleResize) // 컴포넌트 언마운트 시 이벤트 리스너 제거
      }
    }
  }, [dispatch])

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Korea Beef Soup</title>
          <meta name="description" content="Korea Beef Soup" />
        </Head>
        <Global styles={GlobalStyle} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default wrapper.withRedux(App)
