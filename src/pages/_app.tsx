import { Provider as NextAuthProvider } from 'next-auth/client'
import { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux';

import { Header } from '../components/Header';
import store from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <ReduxProvider store={store}>
        <Header />
        <Component {...pageProps} />
      </ReduxProvider>
    </NextAuthProvider >
  );
}

export default MyApp
