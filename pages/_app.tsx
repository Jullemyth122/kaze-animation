import { Layout } from '@/components/Layout'
import { GlobalContextProvider } from '@/functionality/GlobalFunctionality'
import '@/styles/globals.css'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import SEO from '../next-seo-config'

export default function App({ Component, pageProps }: AppProps) {
  return ( <>
    <GlobalContextProvider>
      <DefaultSeo {...SEO} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContextProvider>
  </>)
}
