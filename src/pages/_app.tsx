import { Provider as NextAuthProvider } from 'next-auth/client'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Component {...pageProps} />
    </NextAuthProvider >
  );
}

export default MyApp
