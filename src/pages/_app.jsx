import {SessionProvider} from 'next-auth/react';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from '../app/store';
import '../styles/globals.css';

function MyApp({Component, pageProps}) {
  return (
    <ReduxProvider store={store}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ReduxProvider>
  );
}

export default MyApp;
