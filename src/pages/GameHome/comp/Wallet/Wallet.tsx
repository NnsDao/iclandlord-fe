import Serves from '@/hooks/Serves';
import { useSizeState } from '@/hooks/sizeContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useGlobalContext } from '@/hooks/Store/Store';
import dfinityIcon from '@/static/logo/icp.png';
import usdcImg from '@/static/logo/usdc.svg';
import coinImg from '@/static/resource/coin.png';
import ExpandMore from '@/static/resource/form/expand_more.svg';
import KeyboardArrowRight from '@/static/resource/form/keyboard_arrow_right.svg';
import North from '@/static/resource/form/north.svg';
import South from '@/static/resource/form/south.svg';
import walletActive from '@/static/resource/form/wallet-active.png';
import inpBg from '@/static/resource/form/wallet-inp.png';
import walletLeft from '@/static/resource/form/wallet-left.png';
import walletBg from '@/static/resource/form/walletBg.png';
import TextField from '@mui/material/TextField';
import { MouseEventHandler, useEffect, useState } from 'react';
import { principalToAccountIdentifier } from '../../../../lib/account';
import { getUserICP } from '../../../../lib/utils';

import Form from '../DefaultForm';
import './index.css';

import toast, { Toaster } from 'react-hot-toast';

export default function Wallet({ open, close }: { open: boolean; close: MouseEventHandler<HTMLDivElement> }) {
  const { font, getSizeStyle, h, w, sp } = useSizeState();
  const { state } = useGlobalContext();
  const principal = state.principal;
  const [tokenBalance, setToekn] = useState(BigInt(0));
  const [accountId, setAccountID] = useState('');
  const [tokenICPBalance, setICPToekn] = useState(0);

  const [chooseTab, setChooseTab] = useState(0);
  const [chooseStatus, setLeftActive] = useState('balance');

  const [WithDraw, setWithDraw] = useState({
    ID: '',
    Quantity: '',
  });

  const [deposit, setDeposit] = useState({
    addr: '',
  });
  // get token balance
  useEffect(() => {
    if (state.isAuthed) {
      const aId = principalToAccountIdentifier(principal && !principal.isAnonymous() && principal.toText(), 0);
      setAccountID(aId);
      (async () => {
        const res = await Serves.get_points();
        console.log(res, 'token balance');
        setToekn(res);
        const useICP = await getUserICP(aId);
        setICPToekn(Number(useICP) / 100000000);
      })();
    }
  }, [state.isAuthed]);

  function setComming() {
    toast.success('Comming Soon!');
  }

  function setCopyStatus() {
    toast.success('Copy Account ID Success!');
  }

  function buildFormBody(chooseTab: number) {
    if (chooseStatus == 'withdraw') {
      if (chooseTab == 0) {
        return (
          <div className="wallet-form-body">
            <div
              className="wallet-account-line inp"
              style={{ ...getSizeStyle(656, 74), backgroundImage: `url(${inpBg})` }}>
              <input
                value={WithDraw.ID}
                onChange={val => {
                  setWithDraw({ ...WithDraw, ID: val.target.value });
                }}
                type="text"
                name=""
                style={{ fontSize: sp(24) }}
                placeholder="Account ID / Principal ID / .IC"
                id=""
              />
            </div>

            <div
              className="wallet-account-line inp"
              style={{
                ...getSizeStyle(656, 74),
                alignItems: 'center',
                marginTop: h(35),
                backgroundImage: `url(${inpBg})`,
              }}>
              <input
                type="text"
                name=""
                value={WithDraw.Quantity}
                onChange={e => {
                  setWithDraw({ ...WithDraw, Quantity: e.target.value });
                }}
                style={{ fontSize: sp(24) }}
                placeholder="Quantity"
                id=""
              />

              <span style={{ color: '#fff', fontSize: sp(32) }}>ICP</span>

              <span style={{ color: '#FEF08A', fontSize: sp(32), marginLeft: w(74), marginRight: w(19) }}>Max</span>
            </div>

            <div
              style={{
                ...getSizeStyle(656, 74),
                alignItems: 'center',
                marginTop: h(35),
                fontSize: sp(32),
              }}>
              <div className="overlap-group">
                <div className="text-wrapper-9">COMMING SOON</div>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className="wallet-form-body">
          <h2 style={{ color: 'rgba(255, 255, 255, 0.50)', textAlign: 'left', fontSize: sp(24) }}>
            Send Icp to this address
          </h2>

          <div className="wallet-account-line inp area" style={{ ...getSizeStyle(656, 140), marginTop: h(21) }}>
            <textarea
              name=""
              value={deposit.addr}
              onChange={e => {
                setDeposit({ ...deposit, addr: e.target.value });
              }}
              style={{ fontSize: sp(24), padding: `${h(18)} ${w(24)}` }}
              placeholder={accountId}
              id=""
            />
          </div>

          <div className="confirm-group">
            <div className="overlap-group">
              <div className="text-wrapper-9">
                <CopyToClipboard text={accountId} onCopy={() => setCopyStatus()}>
                  <span>COPY ACCOUNT ID</span>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  function walletTab() {
    if (chooseStatus == 'balance') {
      return (
        <div className="wallet-right-tab-wallet" style={{ marginBottom: h(31) }}>
          {walletBalance.map((item, index) => (
            <div className="frame">
              <div className="frame-input">
                <img className="ellipse" alt="token nut" src={item.icon} />
                <div className="text-wrapper">{item.title}</div>
              </div>
              <div className="text-wrapper">{item.amount.toString()}</div>
            </div>
          ))}
        </div>
      );
    } else if (chooseStatus == 'withdraw') {
      return (
        <div className="wallet-right-tab" style={{ marginBottom: h(31) }}>
          <h2
            onClick={() => {
              setChooseTab(0);
            }}
            style={{ ...font(32) }}
            className={chooseTab == 0 ? 'wallet-tab-item on' : 'wallet-tab-item'}>
            WithDraw
          </h2>

          <h2
            onClick={() => {
              setChooseTab(1);
            }}
            style={{ ...font(32) }}
            className={chooseTab == 1 ? 'wallet-tab-item on' : 'wallet-tab-item'}>
            Deposit
          </h2>
        </div>
      );
    } else if (chooseStatus == 'swap') {
      return (
        <div className="wallet-right-tab-swap">
          <div className="frame">
            <div className="div">
              <div className="div-2">
                <div className="div-3">
                  <div className="text-wrapper">From</div>
                  <div className="text-wrapper-2">Balance: 0.095791</div>
                </div>
                <div className="div-3">
                  <div className="text-wrapper-3">
                    <TextField
                      id="standard-multiline-flexible"
                      label="amount"
                      multiline
                      maxRows={2}
                      variant="standard"
                    />
                  </div>
                  <div className="div-4">
                    <div className="text-wrapper-4">MAX</div>
                    <div className="div-5">
                      <img className="ellipse" alt="Ellipse" src={usdcImg} />
                      <div className="text-wrapper-5">ICP</div>
                      <img className="icon-instance-node" alt="Ellipse" src={ExpandMore} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="div-6">
                <img className="icon-instance-node-2" alt="Ellipse" src={North} />
                <img className="icon-instance-node-2" alt="Ellipse" src={South} />
              </div>
              <div className="div-2">
                <div className="div-3">
                  <div className="text-wrapper">To (Estimate)</div>
                  <div className="text-wrapper-6">Balance: 0.095791</div>
                </div>
                <div className="div-3">
                  <div className="text-wrapper-3">
                    <TextField
                      id="standard-multiline-flexible"
                      label="amount"
                      multiline
                      maxRows={2}
                      variant="standard"
                    />
                  </div>
                  <div className="frame-wrapper">
                    <div className="div-7">
                      <img className="ellipse" alt="Ellipse" src={coinImg} />
                      <div className="text-wrapper-7">NUT</div>
                      <img className="icon-instance-node" alt="Ellipse" src={ExpandMore} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="div-3">
                <div className="text-wrapper-8">Slippage Tolerance</div>
                <div className="div-8">
                  <div className="text-wrapper-8">0.5%</div>
                  <img className="icon-instance-node" alt="Ellipse" src={KeyboardArrowRight} />
                </div>
              </div>
            </div>
            <div className="group">
              <div className="overlap-group">
                <div className="text-wrapper-9">SWAP</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  const walletList = [
    {
      title: 'Balance',
      activeStatus: 'balance',
    },
    {
      title: 'Deposit',
      activeStatus: 'withdraw',
    },
    // {
    //   title: 'Swap',
    //   activeStatus: 'swap',
    // },
  ];

  const walletBalance = [
    {
      title: 'NUT',
      amount: tokenBalance,
      icon: coinImg,
    },
    {
      title: 'ICP',
      amount: tokenICPBalance,
      icon: dfinityIcon,
    },
    // {
    //   title: 'USDC',
    //   amount: 100000,
    //   icon: usdcImg,
    // },
  ];

  return (
    <Form bgUrl={walletBg} close={close} title="WALLET" open={open}>
      <div className="wallet-content">
        <div className="wallet-content-left" style={{ width: w(249), marginLeft: w(9), height: '100%' }}>
          {walletList.map((item, index) => (
            <div
              className="wallet-left-item scale-touch"
              onClick={() => {
                setLeftActive(item.activeStatus);
              }}
              key={index}
              style={{
                ...getSizeStyle(249, 80),
                marginTop: h(15),
                backgroundImage: `url(${chooseStatus == item.activeStatus ? walletLeft : walletActive})`,
              }}>
              <span className={chooseStatus == item.activeStatus ? 'wallet-content-span' : 'wallet-content-span-white'}>
                {item.title}
              </span>
            </div>
          ))}
        </div>

        <div
          className="wallet-content-right"
          style={{ marginLeft: w(80), width: w(656), marginTop: h(30), overflow: 'auto', height: h(600) }}>
          {walletTab()}

          {buildFormBody(chooseTab)}
        </div>
        <Toaster />
      </div>
    </Form>
  );
}
