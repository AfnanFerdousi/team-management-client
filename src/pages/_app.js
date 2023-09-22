import "../styles/globals.css";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => page);

  return <>
    {getLayout(<Component {...pageProps} />)}
    <ToastContainer />
  </>;
}
