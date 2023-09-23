import { useSizeState } from '@/hooks/sizeContext';
import buyBtn from '@/static/resource/form/shopBtn.png';
import { MouseEventHandler, useState } from 'react';
import Form from '../DefaultForm';
import './index.css';

export default function Shop({ open, close }: { open: boolean; close: MouseEventHandler<HTMLDivElement> }) {
  const { h, w, font, sp, getSizeStyle } = useSizeState();
  const [current, setCurrent] = useState(0);

  const goodList = [
    {
      name: '',
      pic: '',
      price: '',
    },
    {
      name: '',
      pic: '',
      price: '',
    },
    {
      name: '',
      pic: '',
      price: '',
    },
    {
      name: '',
      pic: '',
      price: '',
    },
    {
      name: '',
      pic: '',
      price: '',
    },
    {
      name: '',
      pic: '',
      price: '',
    },
    {
      name: '',
      pic: '',
      price: '',
    },
    {
      name: '',
      pic: '',
      price: '',
    },
  ];

  function goods() {
    return goodList.map((it, i) => (
      <div key={i} style={getSizeStyle(219, 211)} className="good-item">
        <div>
          <span style={{ ...font(15), color: '#fff' }}>{it.name || 'The Badge Register-1 DAY'}</span>
        </div>
        <div>
          <img
            style={{ ...getSizeStyle(110, 110) }}
            src={
              it.pic ||
              'https://s3-alpha-sig.figma.com/img/70cd/a99c/89ad9ef7bb93fb07a6c655d050061986?Expires=1691971200&Signature=DKfVkNta2HJXA2mQtohuc70kr8HHmVU88QLL8VrWuP06xrmWO~pqPVSN7qr1WirIlpkmsTIsut00L3LDVygqMIXAETU~hEY13MleFc0mFUsGaUZXD7gu9Fx6P4rsdF7e6KjN8Q0n13Bu9Z6BhlwwCxOuazUJKQNkUH3wPa6yNVSyZFjN-ijuPABJAhIxJoYvy~D9dXMav2juASK5lDYVewZPBTTxkAXXof-sOS7kkmz69GBdIH4Dl-vzjKZOxTFFj69q2OlVQb7ZnBqx31lmBD~-cPzfQ0jrK3gOLXAELhFjJGaMu-g8J4xJp4T55b1QRPZJenPv8V5tjmCTUNU~sg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
            }
          />
        </div>

        <div
          className="buy-btn scale-touch"
          style={{
            ...getSizeStyle(113, 45),
            margin: `0 auto`,
            marginTop: 'auto',
            marginBottom: h(8),
            backgroundImage: `url(${buyBtn})`,
          }}></div>
      </div>
    ));
  }

  return (
    <Form title="SHOP" close={close} open={open}>
      <div style={{ padding: `${h(32)} ${w(42)}` }} className="form-content2">
        <div className="content-head">
          <div style={{ ...getSizeStyle(322, 61), fontSize: sp(28), lineHeight: h(91) }} className="type">
            <div
              style={{}}
              onClick={() => {
                setCurrent(0);
              }}
              className={current == 0 ? 'type-item on' : 'type-item'}>
              Token
            </div>
            <div
              onClick={() => {
                setCurrent(1);
              }}
              className={current == 1 ? 'type-item on' : 'type-item'}>
              Prop
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ ...getSizeStyle(248, 57) }} className="money-block coin">
              <div style={getSizeStyle(34, 37)} className="coin-icon"></div>
              <div style={font(26)} className="coin-num">
                88888
              </div>
              <div style={getSizeStyle(40, 40)} className="add-btn"></div>
            </div>

            <div style={{ ...getSizeStyle(248, 57) }} className="money-block demond">
              <div style={getSizeStyle(34, 37)} className="coin-icon"></div>
              <div style={font(26)} className="coin-num">
                88888
              </div>
              <div style={getSizeStyle(40, 40)} className="add-btn"></div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: h(20), gap: w(19) }} className="good-content">
          {goods()}
        </div>
      </div>
    </Form>
  );
}
