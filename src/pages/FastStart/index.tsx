import Counter from '@/components/Count';
import { useSizeState } from '@/hooks/sizeContext';
import add from '@/static/resource/add.png';
import coin from '@/static/resource/coin.png';
import diamond from '@/static/resource/diamond.png';
import backImg from '@/static/resource/fastStart/back.png';
import cancel from '@/static/resource/fastStart/cacel.png';
import loading from '@/static/resource/fastStart/loading.png';
import gift from '@/static/resource/gift.png';
import score from '@/static/resource/score.png';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGlobalContext } from '../../hooks/Store/Store';
import './index.css';

import Serves, { TableStatusResp } from '../../hooks/Serves';

export default function FastStart() {
  const { getSizeStyle, w, h, sp, font } = useSizeState();
  const nav = useNavigate();
  const [param, setParam] = useSearchParams();

  const [isWait, setIsWait] = useState(false);
  const [timeWaitStatus, setTime] = useState(120);
  const [tid, setTableID] = useState(0);

  let timer = useRef<any>();

  const [current, setCurrent] = useState(0);
  const { state } = useGlobalContext();

  const [token, setToken] = useState(BigInt(0));

  useEffect(() => {
    const autoBegin = param.get('auto');
    console.log(autoBegin);
    if (autoBegin) {
      startGame();
    }
  }, []);

  // cancel call   // User leaves game room
  const handleCancelWait = async () => {
    if (!state.isAuthed) {
      toast.error('login first');
      return;
    }
    const res = await Serves.cancelGame();
    console.log(res, 'cancle');
    timer.current = clearInterval(timer.current);
    // setTimer(null)

    setIsWait(false);
  };

  async function requestStatus(tid: bigint) {
    let sid: TableStatusResp;
    timer.current = setInterval(async () => {
      console.log('requestStatus');

      // try {
      let tableStatus = await Serves.tableStatus({ table_id: BigInt(tid) });
      console.log(tableStatus, 'fastStart Page');
      sid = tableStatus;
      if ('Waiting' in sid.status) {
      } else {
        //@ts-ignore
        const bid = await Serves.begin({ table_id: BigInt(tid) });
        console.log(bid, 'debug begin fastStarp');
        timer.current = clearInterval(timer.current);

        setIsWait(false);
        const room = gameCardList[current];
        nav(`/room?tid=${tid.toString()}&bs=${room.note}`);
      }
      // } catch (e) {
      // console.log(e);
      // }
    }, 1000);
  }

  async function startGame() {
    if (!state.isAuthed) {
      toast.error('login first');
      return;
    }

    if (isWait) return;
    setIsWait(true);
    const room = gameCardList[current];
    // const toastID = toast.loading('waiting game...');

    let tid = await Serves.searchTable({
      base_points: BigInt(room.note), // 20 || 100
    });
    console.log(tid, 'debug table id');

    if ('Ok' in tid) {
      const table_id = tid.Ok;
      let bid = await Serves.begin({ table_id: BigInt(table_id) });
      console.log(bid);
      if ('Ok' in bid) {
        timer.current = clearInterval(timer.current);
        requestStatus(tid.Ok);
        // setIsWait(false);
        // const room = gameCardList[current];
        // nav(`/room?tid=${tid.Ok.toString()}&bs=${room.note}`);
      }

      // timer.current = clearInterval(timer.current);
    }
  }

  useEffect(() => {
    if (state.isAuthed) {
      (async () => {
        const res = await Serves.get_points();
        setToken(res);
      })();
    }

    return () => {
      if (isWait) {
        Serves.cancelGame();
      }
      timer.current = clearInterval(timer.current);
    };
  }, [state.isAuthed, timeWaitStatus]);

  const gameCardList = [
    {
      title: 'Lower Level Field',
      note: 20,
      conditions: '1000-15k',
      score: 4,
    },
    {
      title: 'the Common Field',
      note: 100,
      conditions: '5000-60k',
      score: 8,
    },
    // {
    //   title: 'the Premium Field',
    //   note: 400,
    //   conditions: '20k-200k',
    //   score: 16,
    // },
    // {
    //   title: 'Top Field',
    //   note: 1000,
    //   conditions: 'over 100k',
    //   score: 24,
    // },
  ];

  function gameCards() {
    return gameCardList.map((it, i) => {
      return (
        <div
          onClick={() => {
            setCurrent(i);
          }}
          key={i}
          style={{ ...getSizeStyle(320, 199) }}
          className={current == i ? 'game-card-item  scale-touch on' : 'game-card-item  scale-touch'}>
          <div
            className="game-score"
            style={{
              backgroundImage: `url(${score})`,
              ...getSizeStyle(128, 50),
              top: h(-25),
              right: w(-6),
            }}>
            Score x{it.score}
          </div>
          <h2 style={{ ...font(36), WebkitTextStroke: `${sp(1)} #000`, margin: `0 auto`, marginTop: h(46) }}>
            {it.title}
          </h2>
          <div style={{ ...font(24), textShadow: `0px 0px ${sp(6)} 0px rgba(18, 6, 36, 0.5)` }} className="low-note">
            Low Note {it.note}
          </div>
          <div style={{ ...font(20), marginBottom: h(8) }} className="admission">
            <span>Admission Conditions：</span>
            {it.conditions}
          </div>
        </div>
      );
    });
  }

  function buildWaiting() {
    // 构建等待页面

    return (
      <div
        style={{ width: w(1023), marginLeft: w(202), marginTop: h(51), height: h(473), borderRadius: sp(6) }}
        className="wait-area">
        <div style={{ marginTop: h(54), width: w(157), height: h(157) }} className="loading">
          <img className="loading-img" style={{ width: w(157), height: w(157) }} src={loading} />
          <Counter
            style={{
              ...font(36),
              fontWeight: '700',
              textTransform: 'uppercase',
            }}
            time={timeWaitStatus}
          />
          <h2>s</h2>
        </div>

        <h2 className="match-time" style={{ ...font(36), marginTop: h(28) }}>
          projected in the match 120s ...
        </h2>
        <div className="wait-control" style={{ marginTop: h(55) }}>
          <div
            onClick={handleCancelWait}
            className="cancel-btn scale-touch"
            style={{ ...getSizeStyle(222, 82), backgroundImage: `url(${cancel})` }}>
            <span style={{ ...font(30) }}>Cancel</span>
          </div>
        </div>
      </div>
    );
  }

  function buildChoose() {
    return (
      <div style={{ marginTop: h(58), gap: w(41) }} className={'body-card'}>
        {gameCards()}
      </div>
    );
  }

  return (
    <>
      <div className="fast-start"></div>

      <div className="start-body">
        <div style={{ height: h(111), padding: `${h(31)} ${w(180)}` }} className="fast-start-header">
          <img
            onClick={() => {
              nav('/');
            }}
            className="scale-touch"
            style={{ ...getSizeStyle(53, 50) }}
            src={backImg}
          />

          <div
            style={{
              marginLeft: w(421),
              marginRight: w(24),
              width: w(240),
              padding: `${h(8)} ${w(12)}`,
              borderRadius: w(200),
            }}
            className="my-money">
            <img style={{ ...getSizeStyle(34, 37) }} src={coin} />
            <div style={{ ...font(26) }} className="money-num">
              {token.toString()}
            </div>
            <img style={{ ...getSizeStyle(40, 40) }} className="scale-touch" src={add} />
          </div>
          <div style={{ width: w(240), padding: `${h(8)} ${w(12)}`, borderRadius: w(200) }} className="my-money">
            <img style={{ ...getSizeStyle(34, 37) }} src={diamond} />
            <div style={{ ...font(26) }} className="money-num">
              0
            </div>
            <img style={{ ...getSizeStyle(40, 40) }} className="scale-touch" src={add} />
          </div>
        </div>

        <div className="start-body2">
          <div style={{ marginLeft: w(77), marginTop: h(89) }} className="body-side">
            <div style={{ ...getSizeStyle(96, 228), paddingTop: h(21), marginBottom: h(18) }} className="happy">
              <svg xmlns="http://www.w3.org/2000/svg" width={w(40)} height={h(40)} viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 0C19.2762 0.000935609 18.5723 0.23746 17.9948 0.673828V0.670573C12.3698 5.08057 0 10.1901 0 20.7585C0 26.7835 4.8832 31.6667 10.9082 31.6667C14.6966 31.6667 17.4074 29.5178 18.8379 28.0371C17.8492 31.0266 16.022 34.4435 12.6009 36.8327V36.8392C12.3211 36.9761 12.0853 37.1886 11.9202 37.4527C11.755 37.7168 11.6672 38.0219 11.6667 38.3333C11.6667 38.7754 11.8423 39.1993 12.1548 39.5118C12.4674 39.8244 12.8913 40 13.3333 40H26.6667C27.1087 40 27.5326 39.8244 27.8452 39.5118C28.1577 39.1993 28.3333 38.7754 28.3333 38.3333C28.3328 38.0219 28.245 37.7168 28.0798 37.4527C27.9147 37.1886 27.6789 36.9761 27.3991 36.8392V36.8327C23.978 34.4435 22.1508 31.0266 21.1621 28.0371C22.5926 29.5178 25.3034 31.6667 29.0918 31.6667C35.1168 31.6667 40 26.7835 40 20.7585C40 10.1901 27.6302 5.08057 22.0052 0.670573L22.002 0.673828C21.4253 0.23813 20.7227 0.00164158 20 0Z"
                  fill="#7C2D12"
                />
              </svg>
              <h2 style={{ margin: 0, ...font(24), color: 'var(--palette-orange-900, #7C2D12)' }}>Happy</h2>
            </div>
            <img style={{ ...getSizeStyle(116, 122) }} src={gift} />
          </div>
          {isWait ? buildWaiting() : buildChoose()}
        </div>

        <div
          className="shop-left scale-touch"
          style={{ ...getSizeStyle(251, 106), paddingTop: h(26), paddingRight: w(50), ...font(44) }}>
          Shop
        </div>
        <div style={{ ...getSizeStyle(1568, 89) }} className="fast-start-footer">
          <div
            onClick={startGame}
            style={{ ...getSizeStyle(328, 106), marginLeft: w(609), ...font(48), marginTop: h(-17) }}
            className="fast-start-btn scale-touch">
            Fast Start
          </div>
        </div>
      </div>
    </>
  );
}
