import Count from '@/components/Count';
import Serves, { TableStatusResp } from '@/hooks/Serves';
import { useSizeState } from '@/hooks/sizeContext';
import defaultAvatar from '@/static/resource/defaultAvatar.png';
import handCard from '@/static/resource/fastStart/hand-btn.png';
import hints from '@/static/resource/fastStart/hints-btn.png';
import b from '@/static/resource/gameRoom/b.png';
import back from '@/static/resource/gameRoom/back.png';
import clock from '@/static/resource/gameRoom/clock.svg';
import defaultPoker from '@/static/resource/gameRoom/defaultPoker.png';
import unActive from '@/static/resource/gameRoom/disabel.png';
import landlord from '@/static/resource/gameRoom/landlord.png';
import noCall from '@/static/resource/gameRoom/noCall.svg';
import passImg from '@/static/resource/gameRoom/pass.svg';
import pass from '@/static/resource/gameRoom/passBtn.png';
import pok from '@/static/resource/gameRoom/pok.svg';
import robot from '@/static/resource/gameRoom/robot.png';
import setting from '@/static/resource/gameRoom/setting.png';
import rule from '@/static/rule.json';
import { Principal } from '@dfinity/principal';
import { shortPrincipal } from '../../lib/utils';

import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useEffect, useMemo, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGlobalContext } from '../../hooks/Store/Store';
import Pocker from './comp/Poker';
import Result from './comp/Result';
import Setting from './comp/setting';
import './index.css';
import pokes, { sort2Name } from './pokes';

type Player = {
  index: number;
  isLandlord: boolean;
  principalId: string;
  pokerLog?: any[];
};

type Props = {};
export type Pt = keyof typeof rule;

const initial: TableStatusResp = {
  biggest_gamer: [],
  biggest_num: 0,
  call_number: [],
  cards: [],
  create_time: BigInt(0),
  current_gamer_index: 0,
  farmers: [],
  gamers: [],
  landlord: [],
  last_pokers: [],
  multiple: BigInt(0),
  pokers: [],
  status: {} as any,
  winner: {} as any,
  gamer_cards_len: [],
  shot_log_round: [],
  base_points: BigInt(0),
  request_time: BigInt(0),
};

let tun = false;

const GameRoom = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { w, h, getSizeStyle, font, sp, hNumber, wNumber } = useSizeState();

  const lowScore = useRef(BigInt(20));
  const multiple = useRef(BigInt(1));

  const navigate = useNavigate();

  const [result, setResult] = useState({
    res: false,
    win: false,
  });

  const {
    state: { principal },
  } = useGlobalContext();

  const timer = useRef<any>();
  const record = useRef<[Principal, bigint][]>([]);

  const [showMenus, setShowMenus] = useState(false);

  const [tableStatus, setTableStatus] = useState<TableStatusResp>(initial);
  const [settingShow, setSettingShow] = useState(false);

  const [tokenRight, setPlayerTokenRight] = useState(BigInt(0));
  const [timeCount, setPlayerTimeOut] = useState(60);
  const [tokenLeft, setPlayerTokenLeft] = useState(BigInt(0));
  const [tokenLandlord, setPlayerTokenMe] = useState(BigInt(0));

  //check token balance

  // todo 备用字段
  const [players, setPlayers] = useState<Player[]>([]);
  const me = useRef<Player>({
    index: 0,
    isLandlord: false,
    principalId: '',
  });
  const [selected, setSelected] = useState<number[]>([]);

  // async function getToken(num, players) {
  //   if (!num) {
  //     let principalId = Principal.fromText(players);
  //     const res_me = await Serves.get_points(principalId);
  //     setPlayerTokenMe(res_me);
  //   }
  //   if (num == 2) {
  //     let principalTwoId = Principal.fromText(players);
  //     const res_right = await Serves.get_points(principalTwoId);

  //     setPlayerTokenRight(res_right);
  //   }

  //   if (num == 1) {
  //     let principalId = Principal.fromText(players);
  //     const res_left = await Serves.get_points(principalId);
  //     setPlayerTokenLeft(res_left);
  //   }
  // }

  /**
   * @param principal string
   *
   * @returns 0 叫0分 1叫了， 2没有叫分记录
   * */
  function judgeIsCall(principalID: string): number {
    const callList = Array.from(tableStatus.call_number);

    for (const item of callList) {
      if (item[0].toString() == principalID) {
        // exit call record
        if (item[1] > 0) {
          return 1;
        }
        return 0;
      }
    }
    // not found record
    return 2;
  }

  /**
   *  @param pos 1 is Left，2 is Right
   * */
  function buildPlayer(pos: number, player: Player) {
    function buildPok() {
      const items = player.pokerLog!.map((it, i) => (
        <img
          style={{
            marginTop: h(22),
            ...getSizeStyle(96.4, 146),
            marginRight: pos == 2 ? w(-56) : 0,
            marginLeft: pos == 1 ? w(-56) : 0,
          }}
          src={pokes[it + 1]}
          key={i}
        />
      ));
      return <div style={{ marginTop: h(22), display: 'flex' }}>{items}</div>;
    }
    if (!player) return <></>;

    const isLandlord = determinePlayerIdentity(principal?.toText()!);
    player.isLandlord = isLandlord;
    let ele: ReactJSXElement;
    const callRes = judgeIsCall(player.principalId);
    if (callRes == 0) {
      ele = <img style={{ ...getSizeStyle(104, 74), marginTop: h(62) }} src={noCall} />;
    } else if (callRes == 1) {
      ele = (
        <h2
          style={{
            margin: `0 ${w(21)}`,
            marginTop: h(95),
            ...font(50),
            background: `linear-gradient(179deg, #FFFACE 0%, #F6B553 83.85%)`,
            backgroundClip: `text`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
          Call
        </h2>
      );
    } else {
      ele = <></>;
    }
    // right
    if (pos == 2) {
      // setPlayerTokenRightPrincipal(player.principalId);
      // setTimeout(() => {
      //   console.log('player id', player.principalId);

      //   getToken(2, player.principalId);
      // }, 30000);

      return (
        <div className="player-area" style={{ marginLeft: w(65), height: h(277) }}>
          <div className="player-info-box" style={{ marginTop: h(36), borderRadius: `50% 50% ${sp(20)} ${sp(20)}` }}>
            <Avatar
              wstyle={{ ...getSizeStyle(144, 144) }}
              imgStyle={{ ...getSizeStyle(112, 112) }}
              isLandlord={determinePlayerIdentity(player.principalId)}
            />

            <h2 style={{ ...font(23) }} className="player-nickname">
              {shortPrincipal(player.principalId)}
            </h2>

            {/* <div className="player-money">
              <img style={{ ...getSizeStyle(34, 37) }} src={coin} />
              <span style={{ ...font(25), letterSpacing: sp(1.5) }}> {tokenRight.toString()}</span>
            </div> */}
          </div>

          <div className="player-card" style={{ height: h(277) }}>
            {isMe(player.principalId) ? (
              <div
                style={{
                  backgroundImage: `url(${clock})`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  ...getSizeStyle(96, 97),
                  marginRight: w(5),
                  marginTop: h(58),
                }}
                className="player-time">
                <Count time={timeCount} style={{ color: '#624CF6' }} />
              </div>
            ) : (
              <>
                {
                  // //* The player has started playing cards, getLastIndex(tableStatus.current_gamer_index) == player.index)

                  // player.pokerLog && player.pokerLog.length > 0 ? (
                  //   buildPok()
                  // ) : //* Called phased
                  'Calling' in tableStatus.status ? (
                    //* 判断玩家是否叫分
                    ele
                  ) : player.pokerLog ? (
                    player.pokerLog.length > 0 ? (
                      buildPok()
                    ) : (
                      <img style={{ ...getSizeStyle(104, 74), marginTop: h(62) }} src={passImg} />
                    )
                  ) : (
                    <></>
                  )
                }
              </>
            )}
            <div
              className="player-card-num"
              style={{
                ...getSizeStyle(48, 68),
                backgroundImage: `url(${pok})`,

                marginLeft: w(63),
              }}>
              <span>{getPlayerPokerNum(player.principalId)}</span>
            </div>
          </div>
        </div>
      );
    }
    // left

    // setTimeout(() => {
    //   console.log('player id', player.principalId);
    //   getToken(1, player.principalId);
    // }, 30000);

    return (
      <div className="player-area" style={{ marginLeft: 'auto', marginRight: w(65), height: h(277) }}>
        <div className="player-card" style={{ height: h(277) }}>
          {isMe(player.principalId) ? (
            <div
              style={{
                backgroundImage: `url(${clock})`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...getSizeStyle(96, 97),
                marginRight: w(5),
                marginTop: h(58),
              }}
              className="player-time">
              <Count time={timeCount} style={{ color: '#624CF6' }} />
            </div>
          ) : (
            <>
              {'Calling' in tableStatus.status ? (
                //* 判断玩家是否叫分
                ele
              ) : player.pokerLog ? (
                player.pokerLog.length > 0 ? (
                  buildPok()
                ) : (
                  <img style={{ ...getSizeStyle(104, 74), marginTop: h(62) }} src={passImg} />
                )
              ) : (
                <></>
              )}
            </>
          )}

          <div
            className="player-card-num"
            style={{ ...getSizeStyle(48, 68), marginRight: w(63), backgroundImage: `url(${pok})` }}>
            <span>{getPlayerPokerNum(player.principalId)}</span>
          </div>
        </div>
        <div className="player-info-box" style={{ marginTop: h(36), borderRadius: `50% 50% ${sp(20)} ${sp(20)}` }}>
          <Avatar
            wstyle={{ ...getSizeStyle(144, 144) }}
            imgStyle={{ ...getSizeStyle(112, 112) }}
            isLandlord={determinePlayerIdentity(player.principalId)}
          />

          <h2 style={{ ...font(23) }} className="player-nickname">
            {shortPrincipal(player.principalId)}
          </h2>

          {/* <div className="player-money">
            <img style={{ ...getSizeStyle(34, 37) }} src={coin} />
            <span style={{ ...font(25), letterSpacing: sp(1.5) }}>{tokenLeft.toString()}</span>
          </div> */}
        </div>
      </div>
    );
  }

  const [pokers, setPokers] = useState<any[]>(generate([]));

  function getPlayerPokerNum(principal: string): number {
    for (const item of tableStatus.gamer_cards_len) {
      if (item[0].toString() == principal) return item[1];
    }
    return 17;
  }

  function getSort(num: number) {
    if (num == 53 || num == 54) {
      return num;
    }
    const currrent = num % 13;
    if (currrent == 0 || currrent == 1 || currrent == 2) {
      return currrent + 13;
    }
    return currrent;
  }
  function generate(list: Uint32Array | number[]): any[] {
    let array: any[];

    array = Array.from(list);
    const arr = array.map(it => {
      const sort = getSort(it + 1);

      return {
        rank: it + 1,
        sort,
        isSelected: false,
        name: sort2Name[sort],
      };
    });
    return sortPocker(arr);

    // return []
  }

  // Determine if it's my turn
  function isMe(principalId: string) {
    if (tableStatus.gamers.length == 0 || !tableStatus.gamers[tableStatus.current_gamer_index]) return false;
    return tableStatus.gamers[tableStatus.current_gamer_index].toString() == principalId;
  }

  // Determine player identity
  function determinePlayerIdentity(principal: string): boolean {
    return tableStatus.landlord.length > 0 && tableStatus.landlord.toString() == principal;
  }

  function pullTableStatus(tid: any) {
    Serves.tableStatus({ table_id: BigInt(tid) })
      .then(async (res: TableStatusResp) => {
        if (tun) return;
        if (res.request_time < tableStatus.request_time) {
          return;
        }
        setTableStatus(res);
        lowScore.current = res.base_points;
        setPokers(generate(Array.from(res.cards)));

        handleSetPlayers(res);

        if ('Ending' in res.status) {
          const isLandlord = tableStatus.landlord.toString() == principal?.toText();

          // stop pull TableStatus
          timer.current = clearInterval(timer.current);
          tun = true;
          lowScore.current = res.base_points;
          multiple.current = res.multiple;
          // get settlement record
          Serves.actor
            .get_settlement_record({
              base_points: res.base_points,
              create_time: res.create_time,
              table_id: BigInt(tid),
            })
            .then(resp => {
              console.log(resp, 'get_settlement_record');
              record.current = resp;
              if ('Farmer' in res.winner) {
                setResult({
                  res: true,
                  win: !isLandlord,
                });
              } else if ('Landlord' in res.winner) {
                setResult({
                  res: true,
                  win: isLandlord,
                });
              }
            });
        }
      })
      .catch(error => {
        // todo handle Error
        toast.error('request time out');
      });
  }

  function handleWin(tid: string) {
    // stop pull TableStatus
    timer.current = clearInterval(timer.current);
    tun = true;
    lowScore.current = tableStatus.base_points;
    multiple.current = tableStatus.multiple;
    // get settlement record
    Serves.actor
      .get_settlement_record({
        base_points: tableStatus.base_points,
        create_time: tableStatus.create_time,
        table_id: BigInt(tid),
      })
      .then(resp => {
        // console.log(resp, 'get_settlement_record');
        record.current = resp;

        setResult({
          res: true,
          win: true,
        });
      });

    Serves.actor.reset_table({ table_id: BigInt(tid) });
  }

  function handleSetPlayers(res: TableStatusResp) {
    const arr: Player[] = [];
    const pokerLogMap: Map<string, any[]> = new Map();
    const pokerLog = Array.from(res.shot_log_round);
    if (pokerLog.length > 0) {
      for (let item of pokerLog) {
        pokerLogMap.set(item[0].toString(), Array.from(item[1]));
      }

      me.current = { ...me.current };
    }

    res.gamers.forEach((it, i) => {
      if (it.toString() == principal?.toText()) {
        me.current.index = i;
        me.current.pokerLog = pokerLogMap.get(principal?.toText()!) as any;
      } else {
        arr.push({
          principalId: it.toString(),
          isLandlord: false,
          index: i,
          pokerLog: pokerLogMap.get(it.toString()) as any,
        });
      }
    });
    setPlayers(arr);
  }

  function getPlayer(index: number): Player {
    for (const p of players) {
      if (p.index == index) {
        return p;
      }
    }
    // default
    return players[0];
  }

  function resetPokers() {
    // 扑克牌归位
    const p = pokers.map(it => ({ ...it, isSelected: false }));
    setSelected([]);
    setPokers(p);
  }

  // After receiving the playing cards, handle them
  function generatePokes() {
    return useMemo(
      () =>
        pokers.map((it, i) => {
          const index = i;

          return (
            <Pocker
              key={it.rank}
              getSizeStyle={getSizeStyle}
              h={h}
              w={w}
              callback={
                (() => {
                  pokers[index].isSelected = !pokers[index].isSelected;
                  let selectedArr: number[] = JSON.parse(JSON.stringify(selected));
                  const pos = selectedArr.indexOf(index);
                  if (pos > -1) {
                    // 说明已经选中这张牌，要取消选中
                    selectedArr = selectedArr.slice(0, pos).concat(selectedArr.slice(pos + 1, selectedArr.length));
                  } else {
                    // 选中这样牌,然后排序 小到大
                    selectedArr.push(index);
                    selectedArr.sort((a, b) => b - a);
                  }
                  setSelected(selectedArr);
                }) as any
              }
              index={i}
              item={it}
              flag={selected.indexOf(i) > -1}
            />
          );
        }),
      [pokers, selected]
    );
  }

  // Draw the current user's hand
  function buildUserPok() {
    // self

    // setTimeout(() => {
    //   console.log('player id', principal?.toText());

    //   getToken(0, principal?.toText());
    // }, 30000);

    return (
      <>
        <div className="user-pok" style={{ height: h(200) }}>
          <div className="user-pok-avatar" style={{ left: w(212), zIndex: 2, marginTop: 'auto', bottom: 0 }}>
            {/* <img src={defaultAvatar} style={{ ...getSizeStyle(112, 112) }} /> */}
            <Avatar
              wstyle={{ left: w(82), zIndex: 2, marginTop: 'auto', bottom: 0 }}
              imgStyle={{ ...getSizeStyle(112, 112), left: 0 }}
              isLandlord={determinePlayerIdentity(principal?.toText()!)}
            />
            {/*<h2 style={{ ...font(23) }} className="player-nickname">
              {shortPrincipal(principal?.toText()!)}
            </h2>

            <div className="player-money">
              <img style={{ ...getSizeStyle(34, 37) }} src={coin} />
              <span style={{ ...font(25), letterSpacing: sp(1.5) }}> {tokenLandlord.toString()}</span>
            </div> */}
          </div>

          <div style={{ marginLeft: w(-30), flexGrow: 1, display: 'flex', zIndex: 0, justifyContent: 'center' }}>
            {generatePokes()}
          </div>
        </div>

        {isMe(principal?.toText()!) ? (
          <div
            style={{
              backgroundImage: `url(${clock})`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              ...getSizeStyle(96, 97),
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%)`,
              position: 'fixed',
            }}
            className="player-time">
            <Count time={timeCount} style={{ color: '#624CF6' }} />
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }

  function buildMyHandPoker() {
    // console.log(me.current)
    const lastPoker = me.current.pokerLog;
    let body: any;
    if ('Calling' in tableStatus.status) {
      const callRes = judgeIsCall(principal?.toString()!);

      if (callRes == 1) {
        // called
        body = (
          <h2
            style={{
              ...font(50),
              background: `linear-gradient(179deg, #FFFACE 0%, #F6B553 83.85%)`,
              backgroundClip: `text`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            Call
          </h2>
        );
        // break outLoop;
      } else if (callRes == 0) {
        // not call
        body = (
          <h2
            style={{
              marginTop: h(30),
              ...font(50),
              background: `linear-gradient(179deg, #FFFACE 0%, #F6B553 83.85%)`,
              backgroundClip: `text`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            Not Call
          </h2>
        );
      } else {
        body = <></>;
      }
    } else {
      // begin status
      if (!me.current.pokerLog) {
        body = <></>;
      } else if (me.current.pokerLog && me.current.pokerLog.length > 0) {
        body = (
          <>
            {me.current.pokerLog.map((it, i) => (
              <img
                key={i}
                style={{
                  marginTop: h(22),
                  ...getSizeStyle(96.4, 146),
                  marginLeft: i == 1 ? w(-56) : 0,
                  marginRight: i == 0 ? 0 : w(-56),
                }}
                src={pokes[it + 1]}
              />
            ))}
          </>
        );
      } else {
        body = <img style={{ ...getSizeStyle(154, 104), marginTop: h(32) }} src={passImg} />;
      }
    }
    return (
      <div
        style={{
          position: 'fixed',
          left: '50%',
          bottom: h(243),
          width: w(800),
          height: h(200),
          transform: `translateX(-50%)`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {body}
      </div>
    );
  }

  async function handleCallScore(score: number) {
    const tid = searchParams.get('tid');
    // todo
    let num = 0;
    if (score > 0) {
      const arr = Array.from(tableStatus.call_number);
      arr.forEach(it => {
        const score = it[1];
        if (score >= num) {
          num = score + 1;
        }
      });
      // num = tableStatus.current_gamer_index + 1;
    }
    if (num == 0 && score > 0) {
      num = 1;
    }
    const callRecords = tableStatus.call_number;

    tun = true;
    timer.current = clearInterval(timer.current);
    callRecords.push([principal!, num]);
    console.log(callRecords, 'callRecords');
    setTableStatus({
      ...tableStatus,
      current_gamer_index: getNextIndex(tableStatus.current_gamer_index),
      call_number: callRecords,
    });

    const call_score = await Serves.callNumber({ number: num, table_id: BigInt(tid!) });
    console.log(call_score, 'debug call number');
    tun = false;
    setTimer(() => {
      pullTableStatus(tid);
    });
    // toast.success('Successfully!');
  }

  function buildControl() {
    const able = canIShot();
    let body: React.ReactElement;
    if ('Calling' in tableStatus.status) {
      // 叫分阶段

      body = (
        <>
          <div
            className="scale-touch"
            style={{ width: w(260), height: h(94), position: 'relative' }}
            onClick={() => {
              handleCallScore(0);
            }}>
            <img style={{ width: w(260), height: h(94), left: 0, top: 0, position: 'absolute' }} src={pass} />
            <div
              style={{
                left: w(104),
                top: h(23),
                position: 'absolute',
                color: 'white',
                ...font(28),
                fontFamily: 'Oswald',
                fontWeight: '700',
                wordWrap: 'break-word',
              }}>
              Not Call
            </div>
          </div>
          <div
            className="scale-touch"
            style={{ width: w(260), height: h(94), position: 'relative' }}
            onClick={() => {
              handleCallScore(1);
            }}>
            <img style={{ width: w(260), height: h(94), left: 0, top: 0, position: 'absolute' }} src={handCard} />
            <div
              style={{
                left: w(104),
                top: h(23),
                position: 'absolute',
                color: 'white',
                ...font(28),
                fontFamily: 'Oswald',
                fontWeight: '700',
                wordWrap: 'break-word',
              }}>
              Call
            </div>
          </div>
        </>
      );
    } else {
      body = (
        <>
          <div
            className="scale-touch"
            onClick={canIPass() ? handlePass : () => {}}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: w(260),
              height: h(94),
              position: 'relative',
            }}>
            <img
              style={{ width: w(260), height: h(94), left: 0, top: 0, position: 'absolute', zIndex: -1 }}
              src={canIPass() ? pass : unActive}
            />
            <span
              style={{
                color: 'white',
                ...font(28),
                fontFamily: 'Oswald',
                fontWeight: '700',
                wordWrap: 'break-word',
              }}>
              Pass
            </span>
          </div>
          <div
            onClick={able ? handleHint : () => {}}
            className="scale-touch"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: w(260),
              height: h(94),
              position: 'relative',
            }}>
            <img
              style={{ width: '100%', height: '100%', zIndex: -1, left: 0, top: 0, position: 'absolute' }}
              src={able ? hints : unActive}
            />
            <span
              style={{
                color: 'white',
                ...font(28),
                fontFamily: 'Oswald',
                fontWeight: '700',
                wordWrap: 'break-word',
              }}>
              Hints
            </span>
          </div>
          <div
            onClick={handleHandPok}
            className="scale-touch"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: w(260),
              height: h(94),
              position: 'relative',
            }}>
            <img
              style={{ width: '100%', zIndex: -1, height: '100%', left: 0, top: 0, position: 'absolute' }}
              src={able ? handCard : unActive}
            />
            <span
              style={{
                color: 'white',
                ...font(28),
                fontFamily: 'Oswald',
                fontWeight: '700',
                wordWrap: 'break-word',
              }}>
              Hand Cards
            </span>
          </div>
        </>
      );
    }

    if (isMe(principal?.toText()!))
      return (
        <div
          className="control-line"
          style={{
            position: 'fixed',
            bottom: h(242),
            zIndex: 2,
            width: w(844),
            height: h(94),
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: w(32),
            left: '50%',
            display: 'inline-flex',
          }}>
          {/* 这个是出牌阶段的 */}
          {body}
        </div>
      );
  }

  async function shotPoker(_selected: number[], tid: any) {
    const ppp: number[] = _selected.map(it => pokers[it].rank - 1);

    timer.current = clearInterval(timer.current);

    // the rest pokers
    let isWin = _selected.length == pokers.length;
    const _pokers: any[] = [];
    for (let i = 0; i < pokers.length; i++) {
      const isSelected = selected.indexOf(i) > -1;
      if (!isSelected) {
        _pokers.push(pokers[i]);
      }
    }

    if (_pokers.length != 0) {
      tun = true;

      resetPokers();
      setPokers(_pokers);
      me.current.pokerLog = ppp;
      setTableStatus({ ...tableStatus, current_gamer_index: getNextIndex(tableStatus.current_gamer_index) });

      if (isWin) {
        // no rest win
        handleWin(tid);
      }
    }

    Serves.shotPoker({
      cards: ppp,
      table_id: BigInt(tid!),
    })
      .then(res => {
        if (isWin) {
          Serves.actor.reset_table({ table_id: BigInt(tid) });
        }
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        tun = false;
        setTimer(() => {
          pullTableStatus(tid);
        });
      });
  }

  function handleHandPok() {
    let lp: number[] = Array.from(tableStatus.last_pokers);

    if (lp.length == 2 && lp[0] == 53 && lp[1] == 52) {
      // * 王炸返回，提示牌型错误

      resetPokers();
      return;
    }

    const tid = searchParams.get('tid');
    // 找到pokers数组中选中的牌
    // 将这些元素踢出数组
    let arr: any[] = JSON.parse(JSON.stringify(pokers));
    arr = arr.filter(it => !it.isSelected);

    /**
     * refer to myHandPoker
     * */
    let strName = '';
    // for(let i = selected.length -1 ; i > -1; i --) {
    //   const it = selected[i]
    //   const p  = pokers[it]
    //   strName += p.name
    // }
    selected.forEach(it => {
      const p = pokers[it];
      strName += p.name;
    });
    let isOk = false;

    //* lasrPoker
    let _selected: number[] = JSON.parse(JSON.stringify(selected));

    if (strName == 'wW') {
      isOk = true;
      shotPoker([_selected[0], _selected[1]], tid);
      return;
    }
    if (rule.bomb.includes(strName)) {
      shotPoker([_selected[3], _selected[2], _selected[1], _selected[0]], tid);
    }

    if (!lp || lp.length == 0) {
      /**
       * no last poker
       * */
      let index = -1;
      for (let item in rule) {
        const key: Pt = item as Pt;
        let list = rule[key];
        console.log(list, key);
        index = list.indexOf(strName);

        isOk = index != -1;
        if (isOk) break;
      }
    } else {
      let str = '';
      lp.forEach(it => {
        const sort = getSort(it + 1);
        const name = sort2Name[sort];
        str += name;
      });

      // poker type
      let pType: Pt = 'single';
      let index: number = -1;
      for (const key in rule) {
        let list: string[] = rule[key];
        index = list.indexOf(str);
        console.log(list, key);

        // find lastPoker type
        if (index > -1) {
          pType = key as Pt;
          break;
        }
      }

      if (pType == 'rocket') {
        toast.error('Unsurpassed Cards');
        resetPokers();
        return;
      }
      const rangeList = rule[pType].slice(index + 1);
      isOk = rangeList.indexOf(strName) > -1;
      if (!isOk) {
        resetPokers();
        return;
      }
      // *测试代码
      // isOk = true
    }

    if (isOk) {
      shotPoker(_selected, tid);
    } else {
    }
  }

  async function handlePass() {
    const tid = searchParams.get('tid');
    tun = true;

    setTableStatus({ ...tableStatus, current_gamer_index: getNextIndex(tableStatus.current_gamer_index) });
    me.current.pokerLog = [];
    const res = await Serves.pass({
      table_id: BigInt(tid!),
    });

    tun = false;

    console.log(res);
  }

  async function getTableStatus(tid) {
    // @ts-ignore
    Serves.tableStatus({ table_id: BigInt(tid) })
      .then(async (res: TableStatusResp) => {
        if ('Waiting' in res.status) {
          navigate('/start');
          return;
        }
        setTimer(() => {
          pullTableStatus(tid);
        });
      })
      .catch(error => {
        toast.error('request time out');
      });
  }

  function canIPass(): boolean {
    const lp = Array.from(tableStatus.last_pokers);

    return lp.length != 0;
  }

  async function handleHint() {
    try {
      resetPokers();
      const lastPoker = Array.from(tableStatus.last_pokers);
      if (!lastPoker || lastPoker.length == 0) {
        // auto hand card
        setSelected([pokers.length - 1]);
        return;
      }
      if (lastPoker[0] == 52 && lastPoker[1] == 53) {
        return;
      }
      // * last hand card
      const lp = Array.from(lastPoker);
      let str = '';
      lp.forEach(it => {
        const sort = getSort(it + 1);
        const name = sort2Name[sort];
        str += name;
      });

      //* search type
      let pType: Pt = 'single';
      let index: number = 0;
      for (const key in rule) {
        const list: string[] = rule[key];
        index = list.indexOf(str);
        if (index > -1) {
          pType = key as Pt;
          break;
        }
      }
      if (pType == 'rocket') {
        //* 没有牌可以出了
        return;
      }

      //* rangeList是大于上手手牌的牌
      const rangeList = rule[pType].slice(index + 1);
      console.log(pType, rangeList, 'pType');

      let cardsStr: string = '';

      for (let j = pokers.length - 1; j > -1; j--) {
        const it = pokers[j];
        cardsStr += it.name;
      }

      let cardMapList: any[] = [];
      const len = cardsStr.length;
      for (let i = 0; i < len; i++) {
        cardMapList.push({ char: cardsStr[i], index: len - 1 - i });
      }
      //handle same kind poker
      outer: for (const sss of rangeList) {
        let sArr: number[] = [];

        let _cardsStr: any[] = JSON.parse(JSON.stringify(cardMapList));
        inner: for (let i = 0; i < sss.length; i++) {
          const item = sss[i];
          let ind = -1;
          for (let i = 0; i < _cardsStr.length; i++) {
            const charItem = _cardsStr[i];
            if (charItem.char == item) {
              ind = i;
              _cardsStr = _cardsStr.slice(0, ind).concat(_cardsStr.slice(ind + 1));
              sArr.push(charItem.index);

              break;
            }
          }
          // const ind = _cardsStr.indexOf(item);
          // console.log(item, ind);
          if (ind < 0) {
            // 肯定对不上
            sArr = [];
            continue outer;
          }
          // console.log(ind);
          // *删除这个字符
          // console.log(sArr);
        }
        setSelected(sArr);
        return;
      }

      // // *相同类型解决不了用炸弹和网炸
      // if (pType == 'bomb') {
      //   return;
      // }
      for (const bomb of rule.bomb) {
        if (cardsStr.includes(bomb)) {
          const firstIndex = cardsStr.indexOf(bomb[0]);
          setSelected([
            pokers.length - 1 - firstIndex,
            pokers.length - 2 - firstIndex,
            pokers.length - 3 - firstIndex,
            pokers.length - 4 - firstIndex,
          ]);
        }
      }
      // * king

      if (pokers[0].name == 'W' && pokers[1].name == 'w') {
        setSelected([0, 1]);
      }
    } catch (e) {
      console.log(e);
      return;
    }
  }

  function canIShot(): boolean {
    try {
      if (!pokers || !pokers[0]) {
        return false;
      }
      if ((pokers[0].name == 'W' && pokers[1].name == 'w') || Array.from(tableStatus.last_pokers).length == 0) {
        return true;
      }
      const lastPoker = Array.from(tableStatus.last_pokers);
      if (!lastPoker || lastPoker.length == 0) {
        // *没有上手手牌 出一张最小的
        return true;
      }
      // * 有手牌
      const lp = Array.from(lastPoker);
      if (lp[0] == 52 && lp[1] == 53) {
        return false;
      }
      let str = '';
      lp.forEach(it => {
        const sort = getSort(it + 1);
        const name = sort2Name[sort];
        str += name;
      });

      //* 先定位到类型
      let pType: Pt = 'single';
      let index: number = 0;
      for (const key in rule) {
        const list: string[] = rule[key];
        index = list.indexOf(str);
        if (index > -1) {
          pType = key as Pt;
          break;
        }
      }

      if (pType == 'rocket') {
        //* 没有牌可以出了
        return false;
      }

      //* rangeList是大于上手手牌的牌
      const rangeList = rule[pType].slice(index + 1);
      let cardsStr: string = '';

      for (let j = pokers.length - 1; j > -1; j--) {
        const it = pokers[j];
        cardsStr += it.name;
      }

      // *判断能否用相同类型解决
      outer: for (const sss of rangeList) {
        const sArr: number[] = [];
        let _cardsStr = cardsStr;
        inner: for (let i = 0; i < sss.length; i++) {
          const item = sss[i];
          const ind = _cardsStr.indexOf(item);
          // console.log(item, ind);
          if (ind < 0) {
            // 肯定对不上

            continue outer;
          }

          // *删除这个字符
          _cardsStr = _cardsStr.slice(0, ind).concat(_cardsStr.slice(ind + 1));
        }

        return true;
      }

      // *相同类型解决不了用炸弹和网炸
      if (pType == 'bomb') {
        return false;
      }
      // *炸弹
      for (const bomb of rule.bomb) {
        if (cardsStr.includes(bomb)) {
          const firstIndex = cardsStr.indexOf(bomb[0]);
          return true;
        }
      }
      // * 王炸
      if (pokers[0].name == 'w' && pokers[1].name == 'W') {
        return true;
      }

      return false;
    } catch (e) {
      console.log(e);
      return true;
    }
  }

  function setTimer(callback: Function) {
    timer.current = clearInterval(timer.current);
    timer.current = setInterval(() => {
      callback();
    }, 1200);
  }

  useEffect(() => {
    const tid = searchParams.get('tid');
    setTimeout(() => {
      console.log('getTableStatus', tun);
      getTableStatus(tid);
    }, 1000);

    lowScore.current = BigInt(+searchParams.get('bs')!);
  }, [principal]);

  useEffect(() => {
    const tid = searchParams.get('tid');
    setTimer(() => {
      pullTableStatus(tid);
    });

    return () => {
      timer.current = clearInterval(timer.current);
      tun = false;
    };
  }, []);

  useEffect(() => {
    if (!timeCount) {
      canIPass() ? handlePass : handleHint();
    }
  }, [timeCount]);

  return (
    <div className="room-bg">
      <Setting
        open={settingShow}
        close={() => {
          setSettingShow(false);
        }}
      />
      <Result
        principal={principal!}
        multiples={multiple.current}
        record={record.current}
        bottomScore={lowScore.current}
        close={() => {
          setResult({ res: false, win: false });
        }}
        isShow={result.res}
        isWin={result.win}
      />
      {!isMe(principal?.toText()!) ? buildMyHandPoker() : <></>}
      {buildControl()}
      <div className="room-header" style={{ height: h(127) }}>
        <svg
          style={{ position: 'absolute', zIndex: 0, top: 0, left: 0 }}
          xmlns="http://www.w3.org/2000/svg"
          width={wNumber(1688)}
          height={hNumber(127)}
          viewBox={`0 0 ${wNumber(1688)} ${hNumber(127)}`}
          fill="none">
          <path d="M0.5 0.5H1687.5V126.5H0.5V0.5Z" fill="black" fillOpacity="0.1" stroke="#2E1849" />
        </svg>

        {showMenus ? (
          <div
            style={{
              position: 'fixed',
              zIndex: 20,
              left: w(103),
              top: h(20),
              display: 'flex',
              ...getSizeStyle(280, 88),
              borderRadius: w(200),
              alignItems: 'center',
              gap: w(20),
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.30)',
            }}>
            <img
              className="scale-touch"
              onClick={() => {
                navigate('/start');
              }}
              style={{ ...getSizeStyle(56, 56) }}
              src={b}
            />
            <img className="scale-touch" style={{ ...getSizeStyle(56, 56) }} src={robot} />
            <img
              className="scale-touch"
              onClick={() => {
                setSettingShow(true);
              }}
              style={{ ...getSizeStyle(56, 56) }}
              src={setting}
            />
          </div>
        ) : (
          <img
            onClick={() => {
              setShowMenus(true);
              setTimeout(() => {
                setShowMenus(false);
              }, 5000);
            }}
            className="scale-touch exit-btn"
            style={{ ...getSizeStyle(70, 52), position: 'fixed', zIndex: 20, left: w(102), top: h(38) }}
            src={back}
          />
        )}

        <div className="game-header-center" style={{ marginTop: h(16) }}>
          <div className="game-header-center-left" style={{ gap: h(8), width: w(160) }}>
            <div className="game-header-score" style={{ ...font(24) }}>
              Bottom Score
            </div>
            <div className="game-header-count" style={{ ...getSizeStyle(81, 41) }}>
              20
            </div>
          </div>

          <div
            style={{
              marginRight: w(20),
              marginLeft: w(20),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <div style={{ display: 'flex' }}>
              <div
                className={'Calling' in tableStatus.status ? 'room-block' : 'room-block on'}
                style={{ ...getSizeStyle(53, 68) }}>
                {'Calling' in tableStatus.status ? (
                  <img style={{ ...getSizeStyle(53, 68) }} src={defaultPoker} />
                ) : (
                  <img style={{ ...getSizeStyle(53, 68) }} src={pokes[tableStatus.pokers[0] + 1]} />
                )}
              </div>

              <div className="room-block" style={{ ...getSizeStyle(53, 68), marginLeft: w(-16) }}>
                {'Calling' in tableStatus.status ? (
                  <img style={{ ...getSizeStyle(53, 68) }} src={defaultPoker} />
                ) : (
                  <img style={{ ...getSizeStyle(53, 68) }} src={pokes[tableStatus.pokers[1] + 1]} />
                )}
              </div>

              <div className="room-block" style={{ ...getSizeStyle(53, 68), marginLeft: w(-16) }}>
                {'Calling' in tableStatus.status ? (
                  <img style={{ ...getSizeStyle(53, 68) }} src={defaultPoker} />
                ) : (
                  <img style={{ ...getSizeStyle(53, 68) }} src={pokes[tableStatus.pokers[2] + 1]} />
                )}
              </div>
            </div>

            <div
              className="room-level-name"
              style={{ ...getSizeStyle(221, 30), marginTop: h(7), padding: `${h(4)} ${w(30)}` }}>
              <span style={{ ...font(15) }}>Lower Level Field</span>

              <span style={{ ...font(15) }}>{getTime(tableStatus.create_time)}</span>
            </div>
          </div>

          <div className="game-header-center-right" style={{ gap: h(8), width: w(160) }}>
            <div className="game-header-score" style={{ ...font(24) }}>
              Multiple
            </div>
            <div className="game-header-count" style={{ ...getSizeStyle(81, 41) }}>
              {tableStatus.multiple.toString()}
            </div>
          </div>
        </div>
      </div>

      <div className="room-body">
        <>{players.length > 0 && buildPlayer(2, getPlayer(getLastIndex(me.current.index)))}</>

        <div className="game-room-center">
          <div
            style={{ width: w(527), borderRadius: sp(200), padding: `${h(4)} ${w(16)}` }}
            className="game-room-notify">
            {/* <img style={{ ...getSizeStyle(28, 26) }} src={notice} alt="" /> */}
            {/* <span style={{ ...font(22) }}>This version is a beta version, it is expected that the data will be cleared and officially launched within a month.</span> */}
          </div>

          <div
            style={{
              ...getSizeStyle(639, 39),
              justifyContent: 'center',
              marginTop: h(35),
              padding: `${h(4)} ${w(16)}`,
            }}
            className="game-room-name">
            {/* <img style={{ ...getSizeStyle(28, 26) }} src={name} alt="" /> */}
            <span style={{ ...font(22) }}>
              This version is a beta version, it is expected that the data will be cleared and officially launched
              within a month.
            </span>
          </div>

          <h2 className="ld" style={{ marginTop: h(77) }}>
            {'Calling' in tableStatus.status ? '' : 'LANDOWNERS'}
          </h2>
        </div>

        <>{players.length > -1 && buildPlayer(1, getPlayer(getNextIndex(me.current.index)))}</>
      </div>

      {buildUserPok()}
      <Toaster />
    </div>
  );
};

function getTime(t: bigint) {
  const str = t.toString();
  const ttt = str.slice(0, str.length - 6);
  const d = new Date(+ttt);

  return `${d.getHours()}:${d.getMinutes()}`;
}

function sortPocker(list: any[]) {
  const arr = JSON.parse(JSON.stringify(list));

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j].sort < arr[j + 1].sort) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

function Avatar({
  wstyle,
  imgStyle,
  isLandlord,
}: {
  wstyle: React.CSSProperties;
  imgStyle: React.CSSProperties;
  isLandlord: boolean;
}) {
  const { h, getSizeStyle } = useSizeState();
  return (
    <>
      <div className="player-avatar" style={{ position: 'relative', ...wstyle }}>
        <img style={imgStyle} src={defaultAvatar} />
        {isLandlord ? (
          <img
            style={{
              ...getSizeStyle(80, 56),
              position: 'absolute',
              top: h(-18),
              left: '50%',
              transform: `translateX(-50%)`,
            }}
            src={landlord}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

// for Example 3555
function isTrioSingle(str: string): boolean {
  return str[1] == str[2] && str[1] == str[3];
}

function isTrioPair(str: string): boolean {
  return str[2] == str[3] && str[2] == str[4];
}

export function getNextIndex(index: number): number {
  if (index == 2) {
    return 0;
  }
  return index + 1;
}

export function getLastIndex(index: number): number {
  if (index == 0) return 2;
  return index - 1;
}

export default GameRoom;
