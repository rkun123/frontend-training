//import style from '../styles/App.module.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import Header from '../components/header'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div className="bg-gray-50">
        <div className="md:container md:mx-auto max-w-7xl">
          <div className="md:container">
            <Header />
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </RecoilRoot>
  )
}
export default MyApp
