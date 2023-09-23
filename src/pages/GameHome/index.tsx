import { useSizeState } from '@/hooks/sizeContext';
import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Bouns from './comp/Bouns/Bonus';
import FortuneCat from './comp/FortuneCat/FortuneCat';
import Content from './comp/Layout/Content';
import Footer from './comp/Layout/Footer';
import Header from './comp/Layout/Header';
import Rank from './comp/Rank';
import Shop from './comp/Shop/Shop';
import Sign from './comp/Sign/Sign';
import User from './comp/User/User';
import Vip from './comp/Vip/Vip';
import Wallet from './comp/Wallet/Wallet';
import './index.css';

export default function GameHome() {
  const { h, w, getSizeStyle, sp, font } = useSizeState();

  const [bonusOpen, setBonusOpen] = useState(false);

  const [shopOpen, setShopOpen] = useState(false);

  const [userOpen, setUserOpen] = useState(false);

  const [walletOpen, setWalletOpen] = useState(false);

  const [vipOpen, setVipOpen] = useState(false);

  const [rankShow, setRankShow] = useState(false);

  const [catShow, setCatShow] = useState(false);

  const [signShow, setSignShow] = useState(false);

  const headerRef = useRef<{ setToekn }>();

  function setComming() {
    toast.success('Comming Soon!');
  }

  return (
    <>
      <div className={'bg on'}>
        <div style={{ ...getSizeStyle(412, 748), left: w(86) }} className="role"></div>

        <Header ref={headerRef} setUserOpen={setUserOpen} setVipOpen={setVipOpen} />

        <Content setCatShow={setCatShow} setRankShow={setRankShow} setVipOpen={setVipOpen} />

        <Footer setSignShow={setSignShow} setBonusOpen={setBonusOpen} setWalletOpen={setWalletOpen} />

        <div
          style={{ ...getSizeStyle(328, 114), textIndent: w(131), fontSize: sp(44), paddingTop: h(12) }}
          className="shop scale-touch"
          onClick={() => {
            setComming();
          }}>
          Shop
        </div>
      </div>
      <Bouns
        open={bonusOpen}
        close={e => {
          setBonusOpen(false);
        }}
      />

      <Shop
        open={shopOpen}
        close={() => {
          setShopOpen(false);
        }}
      />

      <Sign
        signCallback={token => {
          console.log(headerRef);
          headerRef.current!.setToekn(token);
        }}
        open={signShow}
        close={() => {
          setSignShow(false);
        }}
      />

      <User
        open={userOpen}
        close={() => {
          setUserOpen(false);
        }}
      />
      <Wallet
        open={walletOpen}
        close={() => {
          setWalletOpen(false);
        }}
      />

      <Rank rankShow={rankShow} setRankShow={setRankShow} />

      <Vip
        open={vipOpen}
        close={() => {
          setVipOpen(false);
        }}
      />

      <FortuneCat open={catShow} close={() => setCatShow(false)} />

      <Toaster />
    </>
  );
}
