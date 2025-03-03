// pages/_app.js
import '../styles/globals.css';
import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log('App mounted');
    return () => console.log('App unmounted');
  }, []);

  return (
    <>
      <Head>
        <title>AI Assistant</title>
        <meta name="description" content="A powerful AI assistant web app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <ThemeProvider attribute="class" defaultTheme="dark">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
