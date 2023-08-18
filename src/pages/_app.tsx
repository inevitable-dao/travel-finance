import { AppProps } from 'next/app';
import React from 'react';

import { MobileContainer } from '@/components/MobileContainer';
import { NavigationBar } from '@/components/NavigationBar';
import { GlobalStyle } from '@/styles/GlobalStyle';
import '@/styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MobileContainer>
      <NavigationBar />

      {/* @ts-ignore // Type mismatch after upgrading to React 18 */}
      <GlobalStyle />
      <Component {...pageProps} />

      <div id="portal" />
    </MobileContainer>
  );
}

export default MyApp;
