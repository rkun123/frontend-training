import style from '../styles/App.module.css'
import type { AppProps } from 'next/app'
import Header from '../components/header'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <Header />
        <Component {...pageProps} />
      </div>
    </div>
  )
}
export default MyApp
