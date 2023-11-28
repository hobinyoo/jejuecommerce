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
      if (window.innerWidth > 500) {
        alert('모바일 환경에서 실행 가능합니다.')
        return window.location.replace('/error')
      }
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
          <title>달인의 가마솥</title>
          <meta
            name="description"
            content="물 맛 좋은 제주에서 만든 달인의 가마솥 입니다."
          />
          <meta property="og:image" content="/public/images/jujueLogo.png" />
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
