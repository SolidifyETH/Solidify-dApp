import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataProvider } from 'contexts/data';
import { DialogProvider } from 'contexts/dialog';
import { Web3Provider } from 'contexts/Web3Context';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { SnackbarProvider } from 'notistack';
import '../styles/globals.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { darkTheme } from './theme';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_SUBGRAPH_API,
  cache: new InMemoryCache(),
});

/**
 * Component with an app.
 */
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <SnackbarProvider maxSnack={3}>
          <Web3Provider>
            <DataProvider>
              <DialogProvider>
                <NextNProgress height={4} />
                <Component {...pageProps} />
              </DialogProvider>
            </DataProvider>
          </Web3Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
