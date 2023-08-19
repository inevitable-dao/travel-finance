import { useAtom } from 'jotai';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React from 'react';

import { BottomTabBar } from '@/components/BottomTabBar';
import { MobileContainer } from '@/components/MobileContainer';
import { NavigationBar } from '@/components/NavigationBar';
import { bottomTabNavigatorShown } from '@/lib/atoms';
import { GlobalStyle } from '@/styles/GlobalStyle';
import '@/styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // hide bottom tab bar when current page is `/cards/open`.
  const [tabBarShown] = useAtom(bottomTabNavigatorShown);

  return (
    <MobileContainer>
      <NavigationBar />

      {/* @ts-ignore // Type mismatch after upgrading to React 18 */}
      <GlobalStyle />
      <Component {...pageProps} />

      <div id="portal" />

      {!tabBarShown && <BottomTabBar />}
    </MobileContainer>
  );
}

export default MyApp;
