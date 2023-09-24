import Serves from '@/hooks/Serves';
import { useSizeState } from '@/hooks/sizeContext';
import defaultAvatar from '@static/resource/defaultAvatar.png';
import avatarImg from '@static/resource/exit.png';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../../../hooks/Store/Store';

const Header = forwardRef(({ setUserOpen, setVipOpen }: any, ref) => {
  const { state } = useGlobalContext();

  const [token, setToekn] = useState(BigInt(0));

  useImperativeHandle(ref, () => {
    return {
      setToekn,
    };
  });

  const principal = state.principal;

  console.log(state.isAuthed, principal, 'header page login');

  useEffect(() => {
    if (state.isAuthed) {
      (async () => {
        const res = await Serves.get_points(principal);
        console.log(res, 9999999);
        setToekn(res);
      })();
    }
  }, [state.isAuthed]);

  const { w, h, getSizeStyle, font, sp } = useSizeState();

  function setComming() {
    toast.success('Comming Soon!');
  }

  return (
    <div style={{ height: h(126), padding: `${h(8)} ${w(24)}` }} className="gameHeader">
      <div style={{ gap: w(24) }} className="headerLeft">
        <Link to="/">
          <img style={getSizeStyle(51, 48)} src={avatarImg} />
        </Link>

        <div
          onClick={() => {
            setUserOpen(true);
          }}
          className="userInfo">
          <div style={getSizeStyle(110, 110)} className="user-avatar">
            <img style={{ width: w(72), height: h(72) }} className="avatar-img" src={defaultAvatar} />
          </div>

          <div style={getSizeStyle(176, 82)} className="info-block">
            <div style={font(28)} className="user-name">
              User
            </div>

            <div style={font(22)} className="user-name">
              ID: {principal && !principal.isAnonymous() && principal.toText()}
            </div>
          </div>
        </div>

        <div onClick={() => setVipOpen(true)} className="my-vip">
          <div style={getSizeStyle(57, 43)} className="vip-icon"></div>
          <div style={{ ...getSizeStyle(92, 32), ...font(22), paddingLeft: w(32) }} className="vip-content">
            V0
          </div>
        </div>

        <div style={getSizeStyle(240, 58)} className="my-coin money-block">
          <div style={getSizeStyle(34, 37)} className="coin-icon"></div>
          <div style={font(26)} className="coin-num">
            {token.toString()}
          </div>
          <div style={getSizeStyle(40, 40)} className="add-btn scale-touch"></div>
        </div>

        <div style={getSizeStyle(240, 58)} className="my-coin money-block">
          <div style={getSizeStyle(34, 37)} className="coin-icon diamond"></div>
          <div style={font(26)} className="coin-num">
            0
          </div>
          <div style={getSizeStyle(40, 40)} className="add-btn scale-touch"></div>
        </div>
      </div>

      <div style={{ gap: w(32) }} className="header-right">
        <div
          style={{ ...getSizeStyle(78, 79), fontSize: sp(24) }}
          className="activity-item act scale-touch"
          onClick={() => {
            setComming();
          }}>
          <span style={{ fontSize: sp(24) }}>Activities</span>
        </div>
        <div
          style={{ ...getSizeStyle(78, 79), fontSize: sp(24) }}
          className="activity-item dep scale-touch"
          onClick={() => {
            setComming();
          }}>
          <span style={{ fontSize: sp(24) }}>Deposit</span>
        </div>
      </div>
      <Toaster />
    </div>
  );
});

export default Header;
