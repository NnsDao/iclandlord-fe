import { AUTH_HOUR_MS } from '@/lib/constants';
import FastStart from '@/pages/FastStart';
import GameHome from '@/pages/GameHome';
import GameRoom from '@/pages/GameRoom/GameRoom';
import HappySmashEgg from '@/pages/HappySmashEgg/HappySmashEgg';
import Test from '@/pages/Test';
import { HttpAgent, Identity } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import React, { useEffect } from 'react';
import 'react-animated-router/animate.css';
import { RouteObject, useRoutes } from 'react-router-dom';
import Serves from '../hooks/Serves';
import { useGlobalContext, useSetAgent } from '../hooks/Store/Store';
import { HOST } from '../lib/canisters';

import { astroxInit } from '@/lib/utils';

const routes: RouteObject[] = [
  {
    path: '/start',
    element: <FastStart />,
    index: true,
  },
  {
    path: '/gameHome',
    element: <GameHome />,
  },
  {
    path: '/egg',
    element: <HappySmashEgg />,
  },
  {
    path: '/',
    element: <Test />,
  },
  {
    path: '/room',
    element: <GameRoom />,
  },
];

export default function AppRouter() {
  const {
    state: { isAuthed },
  } = useGlobalContext();
  console.log(isAuthed, 'debug auto login');

  // Auth on refresh config
  const setAgent = useSetAgent();

  const handleAuthenticated = async (authClient: AuthClient) => {
    const identity: Identity = authClient.getIdentity();
    setAgent({
      agent: new HttpAgent({
        identity,
        host: HOST,
      }),
      isAuthed: true,
    });
  };

  const autoReconnection = async () => {
    const isLoginII = Number(localStorage.getItem('isLoginII'));
    const isLoginNFID = Number(localStorage.getItem('isLoginNFID'));
    const isLoginMeWallet = Number(localStorage.getItem('isLoginMeWallet'));

    if (isLoginII) {
      const authClient = await AuthClient.create({
        idleOptions: {
          idleTimeout: AUTH_HOUR_MS,
          disableIdle: true,
          disableDefaultIdleCallback: true,
        },
      });

      if (await authClient.isAuthenticated()) {
        handleAuthenticated(authClient);
      }
    }
    // NFID

    if (isLoginNFID) {
      const authClient = await AuthClient.create({
        idleOptions: {
          idleTimeout: AUTH_HOUR_MS,
          disableIdle: true,
          disableDefaultIdleCallback: true,
        },
      });
      if (await authClient.isAuthenticated()) {
        handleAuthenticated(authClient);
      }
    }

    // me wallet

    if (isLoginMeWallet) {
      //@ts-ignore
      const isICXReady = window.icx._isReady;
      if (isICXReady) {
        //@ts-ignore
        const isconneted = await window.icx.isConnected();
        if (isconneted) {
          //@ts-ignore
          const identity = window.icx.identity;
          setAgent({
            agent: new HttpAgent({
              identity,
              host: HOST,
            }),
            isAuthed: true,
          });
        }
      } else {
        if (!window.ic?.astrox) {
          await astroxInit();
          if (!window.ic?.astrox) return false;
        }
        var isconneted = await window.ic.astrox.isAuthenticated();

        if (isconneted) {
          const identity = window.ic.astrox.identity;
          console.log(identity, 'debug me identity');
          setAgent({
            agent: new HttpAgent({
              identity,
              host: HOST,
            }),
            isAuthed: true,
          });
          // get canister actor
          await Serves.loginMeWallet();
        }
      }
    }
  };

  useEffect(() => {
    autoReconnection();
  }, [isAuthed]);

  return (
    <React.Fragment>
      {/* {useAnimatedRoutes(animateRoutes)} */}
      {useRoutes(routes)}
    </React.Fragment>
  );
}
