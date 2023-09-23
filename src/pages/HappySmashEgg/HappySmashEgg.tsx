import { useSizeState } from '@/hooks/sizeContext';
import add from '@/static/resource/add.png';
import back from '@/static/resource/fastStart/back.png';
import blueEgg from '@/static/resource/goldenEgg/blue.png';
import chuizi from '@/static/resource/goldenEgg/chuizi.png';
import egg from '@/static/resource/goldenEgg/egg.png';
import scoreDot from '@/static/resource/goldenEgg/scoreDot.png';
import { useNavigate } from 'react-router-dom';
import './index.css';

export default function HappySmashEgg() {
  const { font, getSizeStyle, h, sp, w, hNumber, wNumber } = useSizeState();
  const nav = useNavigate();

  const giftInfo = [{}];

  function eggItem(usage: number, eggImg: string, height?: string | number, width?: string | number) {
    return (
      <div
        style={{
          backgroundImage: `url(${eggImg})`,
          ...(height && width ? getSizeStyle(width, height) : getSizeStyle(265, 282)),
        }}
        className="egg-item scale-touch">
        <div
          className="egg-chuizi"
          style={{
            marginTop: h(-23),
            marginRight: w(-16),
            marginLeft: 'auto',
            ...getSizeStyle(157, 157),
            backgroundImage: `url(${chuizi})`,
          }}>
          <span style={{ ...font(35), textIndent: w(42) }}>1</span>
        </div>
      </div>
    );
  }

  // 抽奖进度条节点
  function scoreNote(top: number) {
    return (
      <div className="score-note" style={{ top }}>
        <div
          style={{
            ...getSizeStyle(114, 85),
            marginRight: w(3),
            paddingTop: h(29),
            paddingRight: w(25),
            paddingLeft: w(8),
          }}
          className="score-note-info">
          <span style={{ ...font(18), lineHeight: sp(18) }}>must be gain token</span>
        </div>

        <img
          className="score-note-dot"
          style={{ ...getSizeStyle(34, 34), marginTop: h(25.5) }}
          src={scoreDot}
        />

        <h2 style={{ margin: 0, marginTop: h(16), marginLeft: w(7) }}>8000</h2>
      </div>
    );
  }

  // 抽奖进度条
  function buildScoreTree() {
    return (
      <div style={{ position: 'relative', marginTop: h(13) }}>
        <div className="score-tree" style={{ ...getSizeStyle(26, 514), left: w(121.6), top: h(25) }}></div>

        {scoreNote(h(0))}

        {scoreNote(h(110))}

        {scoreNote(h(260))}
      </div>
    );
  }

  return (
    <div className="happy-egg-bg">
      <div className="egg-header">
        <svg
          style={{ position: 'absolute' }}
          xmlns="http://www.w3.org/2000/svg"
          width={wNumber(1688)}
          height={hNumber(127)}
          viewBox={`0 0 ${wNumber(1688)} ${hNumber(127)}`}
          fill="none">
          <path d="M0.5 0.5H1687.5V126.5H0.5V0.5Z" fill="black" fill-opacity="0.1" stroke="#2E1849" />
        </svg>
        <img
          onClick={() => {
            nav(-1);
          }}
          className="scale-touch"
          style={{ ...getSizeStyle(53, 50), marginLeft: w(98), marginTop: h(31) }}
          src={back}
        />

        <h2
          style={{ fontSize: sp(50), WebkitTextStroke: `${sp(0.7)} #F811FD`, marginLeft: w(38), marginTop: h(19) }}
          className="smash-egg-title">
          Happy Smash Egg
        </h2>

        <div
          className="scale-touch record bg-btn"
          style={{ ...getSizeStyle(259, 94), marginTop: h(16), marginLeft: w(44.5) }}>
          <span style={{ ...font(28) }}>Egg Smash Record</span>
        </div>

        <div
          className="scale-touch record bg-btn"
          style={{ ...getSizeStyle(259, 94), marginTop: h(16), marginLeft: w(44.5) }}>
          <span style={{ ...font(28) }}>List of rewards</span>
        </div>

        <svg
          style={{ marginLeft: w(35), marginTop: h(39) }}
          xmlns="http://www.w3.org/2000/svg"
          width={w(46)}
          height={h(47)}
          viewBox="0 0 46 47"
          fill="none">
          <g filter="url(#filter0_d_215_472)">
            <path
              d="M30.682 3.66663H15.3187C8.64533 3.66663 4.66699 7.64496 4.66699 14.3183V29.6633C4.66699 36.355 8.64533 40.3333 15.3187 40.3333H30.6637C37.337 40.3333 41.3153 36.355 41.3153 29.6816V14.3183C41.3337 7.64496 37.3553 3.66663 30.682 3.66663Z"
              fill="url(#paint0_linear_215_472)"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_215_472"
              x="-3"
              y="-2"
              width="52"
              height="52"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_215_472" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_215_472" result="shape" />
            </filter>
            <linearGradient
              id="paint0_linear_215_472"
              x1="22.9912"
              y1="3.66663"
              x2="22.9912"
              y2="40.3333"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#BE3EFB" />
              <stop offset="1" stop-color="#8CC1FF" />
            </linearGradient>
          </defs>
        </svg>

        <div className="my-egg-account" style={{ ...getSizeStyle(240, 56), marginLeft: w(35), marginTop: h(28) }}>
          <img
            style={{ ...getSizeStyle(47, 39) }}
            src={chuizi}
          />
          <div className="egg-account-num" style={{ ...font(26) }}>
            1
          </div>

          <img
            className="add-btn scale-touch"
            style={{ width: w(40), height: h(40) }}
            src={add}
          />
        </div>
      </div>

      <div className="egg-main">
        <div className="float-gift scale-touch" style={{ ...getSizeStyle(116, 122), left: w(79), bottom: h(98) }}></div>
        <div className="egg-main-left" style={{ width: w(556) }}>
          <div className="egg-gift-info-left">
            <div style={{ marginLeft: w(100), marginTop: h(13) }}>{buildScoreTree()}</div>
          </div>
        </div>

        <div className="float-blue-egg" style={{ left: w(272), bottom: h(-13) }}>
          {eggItem(
            1,
            blueEgg,
            403,
            314
          )}
        </div>

        <div className="egg-main-right">
          <div className="egg-line-1" style={{ marginTop: h(110) }}>
            {eggItem(
              1,
             egg
            )}
            {eggItem(
              1,
             egg
            )}
            {eggItem(
              1,
              egg
            )}
          </div>

          <div className="egg-line-1" style={{ marginTop: h(-10), marginLeft: w(81) }}>
            {eggItem(
              1,
              egg
            )}
            {eggItem(
              1,
              egg
            )}
            {eggItem(
              1,
              egg
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
