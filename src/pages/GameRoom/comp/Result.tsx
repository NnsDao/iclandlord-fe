import { useSizeState } from '@/hooks/sizeContext';
import avatar from '@/static/resource/defaultAvatar.png';
import lose from '@/static/resource/gameRoom/lose.png';
import loseBG from '@/static/resource/gameRoom/loseBg.png';
import loseLight from '@/static/resource/gameRoom/loseLight.png';
import loseTitle from '@/static/resource/gameRoom/loseTitle.png';
import restart from '@/static/resource/gameRoom/restart.png';
import res from '@/static/resource/gameRoom/result.png';
import score from '@/static/resource/gameRoom/score.png';
import win from '@/static/resource/gameRoom/win.png';
import winBG from '@/static/resource/gameRoom/winBg.png';
import winLight from '@/static/resource/gameRoom/winLight.png';
import winTitle from '@/static/resource/gameRoom/winTitle.png';
import { Principal } from '@dfinity/principal';
import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLastIndex, getNextIndex } from '../GameRoom';
import './index.css';

type IProps = {
  isWin: boolean;
  isShow: boolean;
  bottomScore?: bigint;
  multiples?: bigint;
  close: MouseEventHandler<HTMLDivElement>;
  record: [Principal, bigint][];
  principal: Principal;
};

export default function Result({
  bottomScore = BigInt(20),
  multiples = BigInt(1),
  isWin = false,
  close,
  record,
  principal,
}: IProps) {
  const flag = record.length > 0;
  const nav = useNavigate();

  const { font, getSizeStyle, h, hNumber, sp, w, wNumber } = useSizeState();

  function buildTable() {
    if (!record || record.length == 0) {
      return <></>;
    }

    const otherGamer = [];
    let myIndex = 0;
    // for (const item of record) {
    //   myIndex ++;
    //   if(item[0] === principal) {
    //     break;
    //   }
    // }
    for (let i = 0; i < record.length; i++) {
      const item = record[i];
      // console.log(item[0].toString(), principal.toString())
      if (item[0].toString() === principal.toString()) {
        myIndex = i;
        break;
      }
    }

    console.log(myIndex, 'myIndex');

    function buildRow(index: number) {
      return (
        <>
          <span style={{ ...font(30) }}>{record[index] && record[index][0].toString().substring(3, 7)}</span>

          <span style={{ ...font(30) }}>{bottomScore.toString()}</span>
          <span style={{ ...font(30) }}>{multiples.toString()}</span>
          <span style={{ ...font(30) }}>{record[index] && record[index][1].toString()}</span>
        </>
      );
    }

    return (
      <>
        <div className="res-models">
          <div className="table-raw">
            <span style={{ ...font(30) }}>Nickname</span>

            <span style={{ ...font(30) }}>Low score</span>
            <span style={{ ...font(30) }}>Multiples</span>
            <span style={{ ...font(30) }}>Token</span>
          </div>
        </div>
        <div style={{ ...getSizeStyle(762, 74), marginTop: h(15) }} className="table-raw inp">
          {buildRow(getLastIndex(myIndex))}
        </div>

        <div style={{ ...getSizeStyle(762, 74), marginTop: h(21) }} className="table-raw inp">
          {buildRow(getNextIndex(myIndex))}
        </div>

        <div className="res-models" style={{ marginTop: h(25) }}>
          <div className="table-raw">{buildRow(myIndex)}</div>
        </div>
      </>
    );
  }

  function buildLose() {
    return (
      <div style={{ backgroundImage: `url(${lose})`, ...getSizeStyle(1688, 403), marginTop: h(133) }}>
        <div
          className="result-title"
          style={{
            ...getSizeStyle(1016, 169),
            backgroundImage: `url(${loseTitle})`,
            position: 'relative',
            marginTop: h(-46),
            marginBottom: h(-32),
          }}>
          <img
            style={{ position: 'absolute', left: w(28), top: h(-225), zIndex: -1, ...getSizeStyle(959, 390) }}
            src={loseLight}
          />
          <h2
            className="title-txt"
            style={{ 
                
              
              ...font(140), translate: `${w(0)} ${h(-16.5)}`, WebkitTextStroke: `#B25FFC ${sp(2)}` }}>
            LOSE
          </h2>
        </div>

        <div
          className="res-avatar"
          style={{ ...getSizeStyle(112, 112), left: w(360), bottom: h(107), backgroundImage: `url(${avatar})` }}></div>

        <div className="content-info">
          <div
            className="content-score"
            style={{ backgroundImage: `url(${score})`, ...getSizeStyle(226, 273), marginLeft: w(101) }}>
            <h2 style={{ fontSize: sp(50), WebkitTextStroke: `${w(2)} #73321b`, marginTop: h(86) }}>+2</h2>
            <h3 style={{ fontSize: sp(30), marginBottom: h(104) }}>score</h3>
          </div>

          <div className="res-table" style={{ marginRight: w(462), paddingTop: h(16), marginLeft: w(141) }}>
            {buildTable()}
          </div>
        </div>
      </div>
    );
  }

  function buildWin() {
    return (
      <div style={{ backgroundImage: `url(${win})`, ...getSizeStyle(1688, 403), marginTop: h(133) }}>
        <div
          className="result-title"
          style={{
            ...getSizeStyle(1016, 169),
            backgroundImage: `url(${winTitle})`,
            position: 'relative',
            marginTop: h(-36),
            marginBottom: h(-32),
          }}>
          <img
            style={{ position: 'absolute', left: w(28), top: h(-225), zIndex: -1, ...getSizeStyle(959, 390) }}
            src={winLight}
          />
          <h2
            className="title-txt"
            style={{
              background: 'linear-gradient(179deg, #FFFACE 0%, #F6B553 83.85%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              ...font(140),
              translate: `${w(0)} ${h(-16.5)}`,
              WebkitTextStroke: `#B25FFC ${sp(2)}`,
            }}>
            WIN
          </h2>
        </div>

        <div
          className="res-avatar"
          style={{ ...getSizeStyle(112, 112), left: w(360), bottom: h(147), backgroundImage: `url(${avatar})` }}></div>

        <div className="content-info">
          <div
            className="content-score"
            style={{ backgroundImage: `url(${score})`, ...getSizeStyle(226, 273), marginLeft: w(101) }}>
            <h2 style={{ fontSize: sp(50), WebkitTextStroke: `${w(2)} #73321b`, marginTop: h(86) }}>+2</h2>
            <h3 style={{ fontSize: sp(30), marginBottom: h(104) }}>score</h3>
          </div>

          <div className="res-table" style={{ marginRight: w(462), paddingTop: h(16), marginLeft: w(141) }}>
            {buildTable()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: flag ? 'block' : 'none',
          width: '100vw',
          height: '100vh',
          backgroundImage: `url(${isWin ? winBG : loseBG})`,
          backgroundSize: 'cover',
        }}
        className="result-mask"></div>

      <div className={flag ? 'result-content on' : 'result-content '}>
        <div style={{ ...getSizeStyle(649, 39), margin: `0 auto`, backgroundImage: `url(${res})` }}></div>
        {isWin ? buildWin() : buildLose()}
        <div
          className="res-ctr-line"
          style={{ display: 'flex', marginTop: h(32), justifyContent: 'center', gap: w(34) }}>
          <div
            onClick={() => {
              nav('/start?auto=true');
            }}
            className="res-ctr-btn scale-touch"
            style={{ backgroundImage: `url(${restart})`, ...getSizeStyle(259, 94), fontSize: sp(28) }}>
            Clear Card Start
          </div>
          {/* <div className='res-ctr-btn scale-touch' style={{backgroundImage: `url(${continueBtn})`, ...getSizeStyle(259,94), fontSize: sp(28)}}>Continue the game</div> */}
        </div>
      </div>
    </>
  );
}
