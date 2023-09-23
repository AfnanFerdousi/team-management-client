import "../styles/globals.css";
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import store from "../redux/store";

import 'react-toastify/dist/ReactToastify.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => page);

  return <>
      <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
    <ToastContainer />
  </>;
}
