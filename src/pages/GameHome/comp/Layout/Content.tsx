import { useSizeState } from '@/hooks/sizeContext';
import cat from '@/static/resource/catt.png';
import cow from '@/static/resource/cow.png';
import ddz from '@/static/resource/ddz.png';
import defaultAvatar from '@/static/resource/defaultAvatar.png';
import exchange from '@/static/resource/exchange.png';
import egg from '@/static/resource/hongbao.png';
import money from '@/static/resource/money.png';
import month from '@/static/resource/month.png';
import notifyImg from '@/static/resource/notify.png';
import rankBg from '@/static/resource/rankBg.png';
import vip from '@/static/resource/vip.png';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function Content({ setVipOpen, setRankShow, setCatShow }) {
  const { getSizeStyle, h, w, sp, font } = useSizeState();
  const rankList = [{}, {}, {}, {}];
  const navigate = useNavigate();
  function rankItems() {
    return rankList.map((it, i) => (
      <div key={i} style={getSizeStyle(76, 76)} className="rank-item">
        <div style={{ ...getSizeStyle(14, 26), top: h(-9) }} className="num">
          {i + 1}
        </div>

        <img style={getSizeStyle(68, 68)} className="rank-avatar" src={defaultAvatar} />
      </div>
    ));
  }

  function setComming() {
    toast.success('Comming Soon!');
  }

  const activityList = [
    {
      title: 'Golden Eggs',
      cover: egg,
      handler: () => {
        // navigate('/egg');
        toast.success('Comming Soon!');
      },
    },
    {
      title: 'Exchange',
      cover: exchange,
      handler: () => {
        // navigate('/wallet/swap');
        toast.success('Comming Soon!');
      },
    },
    {
      title: 'Fortune Cat',
      cover: month,
      handler: () => {
        // setCatShow(true);
        toast.success('Comming Soon!');
      },
    },
    {
      title: 'VIP',
      cover: vip,
      handler: () => {
        // setVipOpen(true);
        toast.success('Comming Soon!');
      },
    },
  ];
  function activityItems() {
    return activityList.map((it, i) => (
      <div
        key={i}
        onClick={it.handler}
        style={{ ...getSizeStyle(103, 94), backgroundImage: `url(${it.cover})` }}
        className="activity-item scale-touch">
        <span style={{ ...font(24) }}>{it.title}</span>
      </div>
    ));
  }
  return (
    <div className="mid-content">
      <div
        // onClick={setRankShow}
        style={{ ...getSizeStyle(116, 451), marginTop: h(82), marginLeft: w(54.5), backgroundImage: `url(${rankBg})` }}
        className="rank-list">
        <span style={{ fontSize: sp(28) }} className="rank">
          Rank
        </span>

        {rankItems()}
      </div>

      <div style={{ marginTop: h(81), marginLeft: w(315), gap: h(16) }} className="activity-list">
        {activityItems()}
      </div>

      <div className="game-area">
        <div
          style={{ ...getSizeStyle(450, 41), height: h(41), padding: `${h(4)} ${w(16)}`, borderRadius: w(200) }}
          className="notify">
          <img style={{ width: w(28), height: h(26) }} className="notify-icon" src={notifyImg} />

          <div style={{ fontSize: sp(22), width: w(375), marginLeft: w(12) }} className="notify-txt">
            This version is a beta version, it is expected that the data will be cleared and officially launched within
            a month.
          </div>
        </div>

        <Link key="start" to="/start">
          <div
            style={{ ...getSizeStyle(360, 428), marginLeft: w(81), paddingTop: h(245), marginTop: h(44.5) }}
            className="Landowner scale-touch">
            <img
              style={{ width: w(245), position: 'absolute', height: h(422), left: w(58), top: h(-11), zIndex: -1 }}
              src={ddz}
            />
            <div style={{ fontSize: sp(40) }} className="landdowner-txt">
              Landlord
            </div>

            <div className="footer">
              <div style={{ ...getSizeStyle(108, 54), marginLeft: w(10), paddingBottom: h(20) }} className="foot-tag">
                <div style={{ ...font(20), lineHeight: h(20) }} className="win">
                  Winning
                </div>
                <div style={{ ...font(13), marginTop: h(-2) }} className="red">
                  Red Envelope
                </div>
              </div>

              <div style={{ fontSize: sp(28) }} className="classic">
                Classic Field
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div style={{ marginTop: h(74) }} className="game-area-column">
        <div
          style={{ ...getSizeStyle(414, 150) }}
          className="block-item b"
          onClick={() => {
            setComming();
          }}>
          <img style={{ width: w(128), height: h(128) }} src={cow} />
          <span style={{ ...font(28) }}>Happy Double Ten</span>
        </div>
        <div
          style={{ ...getSizeStyle(414, 150) }}
          className="block-item g"
          onClick={() => {
            setComming();
          }}>
          <img style={{ width: w(128), height: h(128) }} src={cat} />
          <span style={{ ...font(32) }}>Flying Beasts</span>
        </div>
        <div
          style={{ ...getSizeStyle(414, 150) }}
          className="block-item p"
          onClick={() => {
            setComming();
          }}>
          <img style={{ width: w(128), height: h(128) }} src={money} />
          <span style={{ ...font(32) }}>Texas Hold'em</span>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
