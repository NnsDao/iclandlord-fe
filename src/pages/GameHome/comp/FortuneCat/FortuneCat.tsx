import { useSizeState } from '@/hooks/sizeContext';
import cat from '@/static/resource/cat.png';
import Form from '../DefaultForm';
import './index.css';

export default function FortuneCat({ open, close }) {
  const { font, h, w, sp, getSizeStyle } = useSizeState();

  function catHeader() {
    return (
      <div className="cat-header">
        <h1 style={{ fontSize: sp(50), WebkitTextStroke: `${sp(1)} #F811FD` }}>Fortune Cat</h1>

        <div style={{ right: w(67), top: h(8) }} className="cat-header-help">
          <svg xmlns="http://www.w3.org/2000/svg" width={w(47)} height={h(47)} viewBox="0 0 46 47" fill="none">
            <g filter="url(#filter0_d_248_466)">
              <path
                d="M30.682 3.66663H15.3187C8.64533 3.66663 4.66699 7.64496 4.66699 14.3183V29.6633C4.66699 36.355 8.64533 40.3333 15.3187 40.3333H30.6637C37.337 40.3333 41.3153 36.355 41.3153 29.6816V14.3183C41.3337 7.64496 37.3553 3.66663 30.682 3.66663Z"
                fill="url(#paint0_linear_248_466)"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_248_466"
                x="-3"
                y="-2"
                width="52"
                height="52"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_248_466" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_248_466" result="shape" />
              </filter>
              <linearGradient
                id="paint0_linear_248_466"
                x1="22.9912"
                y1="3.66663"
                x2="22.9912"
                y2="40.3333"
                gradientUnits="userSpaceOnUse">
                <stop stopColor="#BE3EFB" />
                <stop offset="1" stopColor="#8CC1FF" />
              </linearGradient>
            </defs>
          </svg>

          <div style={{ ...font(22) }}>Help</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Form height={572} width={989} top={104} open={open} close={close} header={catHeader()} title="">
        <div className="cat-container">
          <div style={{ marginTop: h(-131), marginLeft: w(-196) }} className="cat-left">
            <img style={{ ...getSizeStyle(725, 725) }} src={cat} alt="" />
          </div>

          <div
            style={{ width: w(504), padding: `${h(12)} 0`, marginLeft: w(-70), paddingRight: w(42) }}
            className="cat-right">
            <div className="token-wealth" style={{ marginRight: w(25) }}>
              <h2 style={{ ...font(40) }} className="token-wealth-title">
                Today's Wealth
              </h2>
              <h2 style={{ ...font(40) }}>{0}</h2>
              <h2 style={{ ...font(40) }}>token</h2>
            </div>

            <h2 style={{ ...font(22), marginTop: h(6) }} className="number-of-food">
              Number of cat food holdings: 0
            </h2>

            <div className="cat-level">
              <span style={{ ...font(22), marginRight: w(15), marginTop: h(10) }}>LV.{0}</span>
              <div className="cat-level-progress" style={{ ...getSizeStyle(407, 15) }}></div>
            </div>

            <div className="cat-heavy" style={{ marginRight: w(25), marginTop: h(23) }}>
              <h2 style={{ ...font(28) }}>Fortune Cat Heavy 0 KG</h2>
              <div className="scale-touch feed-btn" style={{ ...getSizeStyle(124, 48) }}>
                <span style={{ ...font(18), WebkitTextStroke: `${sp(1)} #000` }}>Feeding</span>
              </div>
            </div>

            <div className="token-wealth" style={{ marginRight: w(25), marginTop: h(33) }}>
              <h2 style={{ ...font(40) }} className="token-wealth-title">
                Today's Wealth
              </h2>
              <h2 style={{ ...font(40) }}>{0}</h2>
              <h2 style={{ ...font(40) }}>token</h2>
            </div>

            <div className="cat-info" style={{ marginTop: h(5) }}>
              <div className="step-btn prev" style={{ ...getSizeStyle(34, 57), marginTop: h(29) }}></div>

              <div
                className="cat-info-content"
                style={{ ...getSizeStyle(408, 116), padding: `${h(28)} ${w(18)}`, margin: `${0} ${w(12)}` }}>
                <span style={{ ...font(22), maxLines: 2 }}>
                  This is a lucky cat in early childhood. It can be done long.
                </span>
              </div>

              <div className="step-btn next" style={{ ...getSizeStyle(34, 57), marginTop: h(29) }}></div>
            </div>

            <div className="cat-foot-desc" style={{ width: w(509), height: h(29), lineHeight: h(12) }}>
              <span style={{ ...font(10) }}>
                The heavier the cat weight, the more token you get daily, the 1KG weight you can increase per bag of cat
                food, after reaching the maximum, each bag of cat food can be redeemed game chips, limited to once a
                day.
              </span>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}
