import type { Identifier, XYCoord } from 'dnd-core';
import update from 'immutability-helper';
import { useAtom } from 'jotai';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React from 'react';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
// import type { FC } from 'react'
import { useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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

      <DndProvider backend={HTML5Backend}>
        <Component {...pageProps} />
      </DndProvider>

      <div id="portal" />

      {!tabBarShown && <BottomTabBar />}
    </MobileContainer>
  );
}

export default MyApp;
