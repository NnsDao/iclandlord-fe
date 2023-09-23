import ServesToken from '@/hooks/ServesToken';
import { useSizeState } from '@/hooks/sizeContext';
import { astroxConfig, astroxInit } from '@/lib/utils';
import dfinity from '@/static/logo/dfinity.svg';
import dscvr from '@/static/logo/dscvr.svg';
import github from '@/static/logo/github.svg';
import mora from '@/static/logo/mora.svg';
import openchat from '@/static/logo/openchat.svg';
import twitter from '@/static/logo/twitter.svg';
import arrow from '@/static/resource/landing/arrow.png';
import box from '@/static/resource/landing/box.png';
import indexBG from '@/static/resource/landing/index.png';
import joinBG from '@/static/resource/landing/joinBG.png';
import launchImg from '@/static/resource/landing/launch.png';
import loginButton from '@/static/resource/landing/login-button.png';
import logo from '@/static/resource/landing/logo.png';
import nft from '@/static/resource/landing/nft.png';
import realTime from '@/static/resource/landing/realTime.png';
import rewards from '@/static/resource/landing/rewards.png';
import security from '@/static/resource/landing/security.png';
import { AstroXWebViewHandler } from '@astrox/sdk-webview';
import { HttpAgent, Identity } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { Box, Stack } from '@mui/material';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Serves from '../../hooks/Serves';
import { useGlobalContext, useSetAgent } from '../../hooks/Store/Store';
import { HOST } from '../../lib/canisters';
import { APPLICATION_NAME, AUTH_HOUR_MS, CONNECT_OBJ_HOST, ONE_WEEK_NS } from '../../lib/constants';
import Login from './comp/login';
import './style.css';

//@ts-ignore
window.icx = new AstroXWebViewHandler();

if (!window.ic?.astrox) astroxInit();

export default function Test(props: any) {
  const navigate = useNavigate();
  const setAgent = useSetAgent();
  const { state } = useGlobalContext();
  //@ts-ignore
  const [authClient, setAuthClient] = useState<AuthClient>(null);

  const [login, setLogin] = useState(false);

  const { font, getSizeStyle, h, hNumber, sp, w, wNumber, handleResize } = useSizeState();

  // native login
  const handleIILogin = async () => {
    const authClient = await AuthClient.create({
      idleOptions: {
        idleTimeout: AUTH_HOUR_MS,
        disableIdle: true,
        disableDefaultIdleCallback: true,
      },
    });
    authClient.login({
      maxTimeToLive: ONE_WEEK_NS,
      onSuccess: () => {
        localStorage.setItem('isLoginII', '1');
        localStorage.setItem('isLoginStatus', '1');
        setAuthClient(authClient);
        handleAuthenticated(authClient);
        // first login agent
        Serves.loginII();
        ServesToken.loginII();
        setLogin(false);
      },
    });
  };

  const handleAuthenticated = async (authClient: AuthClient) => {
    const identity = (await authClient.getIdentity()) as unknown as Identity;

    setAgent({
      agent: new HttpAgent({
        identity,
        host: HOST,
      }),
      isAuthed: true,
    });
  };

  // NFID

  const handleNFIDLogin = async () => {
    const authClient = await AuthClient.create({
      idleOptions: {
        idleTimeout: AUTH_HOUR_MS,
        disableIdle: true,
        disableDefaultIdleCallback: true,
      },
    });
    await authClient.login({
      onSuccess: async () => {
        localStorage.setItem('isLoginNFID', '2');
        localStorage.setItem('isLoginStatus', '2');
        setAuthClient(authClient);
        handleAuthenticated(authClient);
        Serves.loginNFID();
        ServesToken.loginNFID();
      },
      identityProvider: `https://nfid.one/authenticate/?applicationName=${encodeURIComponent(APPLICATION_NAME)}`,
      maxTimeToLive: ONE_WEEK_NS,
    });
    setLogin(false);
  };

  // me wallet handleMewalletLogin

  const handleMeWalletLogin = async () => {
    //check app is  in ME App.
    try {
      //@ts-ignore
      await window.icx.init();
    } catch (e) {
      //@ts-ignore
      window.icx = false;
    }
    //@ts-ignore
    const isICXReady = window.icx._isReady;
    // webview
    if (isICXReady) {
      //@ts-ignore
      await astroxInit(CONNECT_OBJ_HOST.host, CONNECT_OBJ_HOST.whitelist);

      //@ts-ignore
      const isconneted = await window.icx.isConnected();

      if (!isconneted) {
        //@ts-ignore
        await window.icx.connect({
          ...astroxConfig,
          delegationTargets: CONNECT_OBJ_HOST.whitelist,
          ledgerHost: CONNECT_OBJ_HOST.host,
        });
      }
      //@ts-ignore
      const identity = window.icx.identity;

      localStorage.setItem('isLoginMeWallet', '3');
      localStorage.setItem('isLoginStatus', '3');

      setAgent({
        agent: new HttpAgent({
          identity,
          host: HOST,
        }),
        isAuthed: true,
      });
    } else {
      if (!window.ic?.astrox) {
        //@ts-ignore
        await astroxInit(CONNECT_OBJ_HOST.host, CONNECT_OBJ_HOST.whitelist);
        if (!window.ic?.astrox) return false;
      }
      var isconneted = await window.ic.astrox.isAuthenticated();

      if (!isconneted) {
        await window.ic.astrox.connect({
          ...window.ic.astrox.connectOptions,
          delegationTargets: CONNECT_OBJ_HOST.whitelist,
          ledgerHost: CONNECT_OBJ_HOST.host,
        });
      }

      const identity = window.ic.astrox.identity;
      localStorage.setItem('isLoginStatus', '3');
      localStorage.setItem('isLoginMeWallet', '3');

      setAgent({
        agent: new HttpAgent({
          identity,
          host: HOST,
        }),
        isAuthed: true,
      });
    }
    setLogin(false);
  };

  const handleLogout = async () => {
    // II NFID me Wallet
    const isLoginII = Number(localStorage.getItem('isLoginII'));
    const isLoginNFID = Number(localStorage.getItem('isLoginNFID'));
    const isLoginMeWallet = Number(localStorage.getItem('isLoginMeWallet'));
    if (isLoginII || isLoginNFID) {
      localStorage.removeItem('isLoginII');
      localStorage.removeItem('isLoginNFID');
    } else if (isLoginMeWallet) {
      try {
        //@ts-ignore
        await window.icx.init();
      } catch (e) {
        //@ts-ignore
        window.icx = false;
      }
      //@ts-ignore
      const isICXReady = window.icx._isReady;
      if (isICXReady) {
        //@ts-ignore
        await window.icx.disconnect();
      } else {
        await window.ic.astrox.disconnect();
      }
      localStorage.removeItem('isLoginMeWallet');
    }

    setAgent({ agent: null, isAuthed: false });
    handleClose();
  };

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const mediumList = [
    {
      url: 'https://twitter.com/IClandlord',
      imgs: twitter,
      alt: 'iclandlord game',
    },
    {
      url: 'https://oc.app/community/kuzi5-wiaaa-aaaar-ascgq-cai/channel/208061136764486177757385549404728664663',
      imgs: openchat,
      alt: 'openchat iclandlord game',
    },
    {
      url: 'https://dscvr.ic0.app/u/IClandlord',
      imgs: dscvr,
      alt: 'openchat iclandlord game',
    },
    {
      url: 'https://mora.app/planet/q3g4f-dqaaa-aaaan-qd6qq-cai',
      imgs: mora,
      alt: 'mora iclandlord game',
    },
    {
      url: 'https://github.com/NnsDao/ddz-fe',
      imgs: github,
      alt: 'github iclandlord game',
    },
  ];

  return (
    <div className="landing-page">
      <Login
        icLogin={handleIILogin}
        nfidLogin={handleNFIDLogin}
        meWalletLogin={handleMeWalletLogin}
        open={login}
        close={() => {
          setLogin(false);
        }}
      />
      <div
        className="landing-header"
        style={{ height: h(56), display: 'flex', width: '100vw', padding: `0 ${w(120)}` }}>
        <div style={{ width: w(200), display: 'flex', alignItems: 'center' }}>
          <img style={{ ...getSizeStyle(40, 40) }} src={logo} />

          <h2 className="ic-landlord" style={{ ...font(18) }}>
            IC Landlord
          </h2>
        </div>

        <div style={{ display: 'flex', gap: w(32) }}>
          <h2 style={{ ...font(16) }}>Home</h2>
          <h2 style={{ ...font(16) }}>NFTs</h2>
          <h2 style={{ ...font(16) }}>Markets</h2>
          <h2 style={{ ...font(16) }}>FAQs</h2>
        </div>

        <div style={{ width: w(200), display: 'flex', justifyContent: 'end' }}>
          {!state.isAuthed ? (
            <Box sx={{ cursor: 'pointer' }} onClick={() => setLogin(true)}>
              <img src={loginButton} style={{ ...getSizeStyle(73, 32) }} />
            </Box>
          ) : (
            <Stack
              sx={{ border: 1, color: '#fff' }}
              onClick={handleClick}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}>
              Play Game
            </Stack>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
            <MenuItem
              onClick={() => {
                navigate('/start');
              }}>
              Fast Game
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>

      <div
        className="index"
        style={{
          height: h(720),
          backgroundImage: `url(${indexBG})`,
          backgroundSize: `100vw ${h(630)}`,
          backdropFilter: 'invert(80%)',
          backgroundRepeat: 'no-repeat',
          paddingTop: h(230),
          backgroundColor: '#0a0b0e',
        }}>
        <h2 style={{ ...font(80), fontWeight: '400', textShadow: `#202020 0 3px 3px` }}>
          We make crypto game and fair
        </h2>

        <div className="title-desc" style={{ ...font(24), textShadow: `#202020 0 3px 3px` }}>
          100% onchain game of IC.
        </div>
        {/* <Link to='/'> */}
        <div
          onClick={() => {
            if (state.isAuthed) {
              navigate('/gameHome');
            } else {
              setLogin(true);
            }
          }}
          className="game-btn"
          style={{
            marginTop: h(12),
            padding: `${h(28)} ${w(48)}`,
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}>
          <img style={{ width: w(244), height: h(84) }} src={launchImg} alt="iclandlord game" />
        </div>
        {/* </Link> */}
      </div>

      <div className="rewards-line" style={{ height: h(429), marginTop: 72 }}>
        <div className="rewards-item" style={{ ...getSizeStyle(341, 285) }}>
          <img src={security} style={{ ...getSizeStyle(207, 207) }} />
          <span style={{ marginTop: h(32.36) }}>Decentralized Security</span>
        </div>

        <div className="rewards-item" style={{ ...getSizeStyle(341, 285) }}>
          <img src={realTime} style={{ ...getSizeStyle(207, 207) }} />
          <span style={{ marginTop: h(32.36) }}>Real-time Competitiveness</span>
        </div>

        <div className="rewards-item" style={{ ...getSizeStyle(341, 285) }}>
          <img src={rewards} style={{ ...getSizeStyle(207, 207) }} />
          <span style={{ marginTop: h(32.36) }}>Personalized Rewards</span>
        </div>
      </div>

      <div
        className="join-bg"
        style={{
          backgroundImage: `url(${joinBG})`,
          height: h(560),
          backgroundSize: 'cover',
          padding: `${h(10)} ${w(120)}`,
        }}>
        <h2 style={{ width: w(640), marginTop: h(208) }}>
          Join the blockchain gaming revolution and enjoy secure and transparent Landlord Battles!
        </h2>
      </div>

      <div className="nft-bg" style={{ height: h(560), padding: `${h(40)} ${w(120)}` }}>
        <div>
          <h2 style={{ fontSize: sp(48), marginTop: h(186) }}>Personalized Props Trading</h2>
          <div style={{ fontSize: sp(18), textAlign: 'start', color: '#ccc' }}>
            You can trade your in-game props in the NFT Marketplace!
          </div>
          <div
            className="trade-btn"
            style={{
              ...getSizeStyle(185, 60),
              marginTop: h(20),
              gap: w(10),
              padding: `${h(20)} ${w(32)}`,
              borderRadius: sp(200),
            }}>
            <span style={{ ...font(20) }}>Trade NFTS</span>
          </div>
        </div>

        <img style={{ ...getSizeStyle(479, 478) }} src={nft} />
      </div>

      <div className="crypto-block" style={{ height: h(560), padding: `${h(40)} ${w(120)}` }}>
        <img style={{ ...getSizeStyle(320, 320) }} src={box} />

        <div style={{ marginLeft: w(112) }}>
          <h2 style={{ width: w(728), marginTop: h(46), fontSize: sp(48), textAlign: 'left' }}>
            Take your first step into safe, secure crypto investing
          </h2>

          <div
            className="start-btn"
            style={{ padding: `${h(20)} ${w(32)}`, ...getSizeStyle(200, 60), borderRadius: sp(200), marginTop: h(32) }}>
            <span style={{ ...font(20) }}>Get Started</span>
          </div>
        </div>
      </div>

      <div className="receive" style={{ padding: `${h(80)} ${w(120)}`, height: h(349) }}>
        <h2 style={{ fontSize: sp(48) }}>Receive transmissions</h2>

        <div className="subscribe" style={{ fontSize: sp(18) }}>
          <span>Unsubscribe at any time.</span>

          <span>Privacy policy↗</span>
        </div>

        <div
          className="inp-email"
          style={{ ...getSizeStyle(364, 56), padding: `${h(16)} ${w(16)}`, borderRadius: sp(12), fontSize: sp(18) }}>
          <input style={{ fontSize: sp(18) }} placeholder="Email Address" />
          <img style={{ ...getSizeStyle(24, 24) }} src={arrow} />
        </div>
      </div>

      <div className="land-footer" style={{ padding: `${h(40)} ${w(120)}` }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'start' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img style={{ ...getSizeStyle(40, 40) }} src={logo} />

            <span style={{ color: '#FFF' }}>IC Landlord</span>
          </div>
          <div
            style={{
              color: `rgba(255, 255, 255, 0.70)`,
              fontSize: sp(18),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <span style={{ marginRight: 10 }}> Full chain of card puzzle games on the IC.</span>
            <img src={dfinity} width={220} height={55} />
          </div>
        </div>

        <div className="media-line" style={{ gap: w(12) }}>
          {mediumList.map(item => (
            <div className="media-item">
              <Link color="inherit" underline="none" variant="body2" href={item.url}>
                <img style={{ ...getSizeStyle(40, 40) }} src={item.imgs} alt={item.alt} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
