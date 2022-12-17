import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "jotai";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
