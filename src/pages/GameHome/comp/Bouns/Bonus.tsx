import { useSizeState } from '@/hooks/sizeContext';
import daily from '@/static/resource/form/bonusDaily.png';
import egg from '@/static/resource/form/bonusEgg.png';
import bonusGift from '@/static/resource/form/bonusGift.png';
import ann from '@/static/resource/form/bounsAnn.png';
import { MouseEventHandler, useState } from 'react';
import Form from '../DefaultForm';
import './index.css';

export default function Bouns({ open, close }: { open: boolean; close: MouseEventHandler<HTMLDivElement> }) {
  const itemList = [
    {
      title: 'Announcement',
      imgUrl: ann,
    },
    {
      title: 'Highlights',
      imgUrl: bonusGift,
    },
    {
      title: 'Daily Check-in',
      imgUrl: daily,
    },
    {
      title: 'Joy Smash Egg',
      imgUrl: egg,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const { h, w, getSizeStyle, sp, font } = useSizeState();

  function sideItems() {
    return itemList.map((it, i) => (
      <div
        key={i}
        onClick={() => {
          setCurrentIndex(i);
        }}
        className={currentIndex == i ? 'side-item scale-touch on' : 'side-item scale-touch'}
        style={{ ...getSizeStyle(273, 74), padding: `${h(11)} ${w(19)}` }}>
        <img style={{ ...getSizeStyle(44, 44) }} className="side-icon" src={it.imgUrl} />

        <div style={{ ...font(26), marginLeft: w(24) }} className="side-txt">
          {it.title}
        </div>
      </div>
    ));
  }

  return (
    <Form width={1128} height={676} close={close} open={open} title="BONUS">
      <div className="form-content">
        <div style={{ width: w(273) }} className="form-left">
          {sideItems()}
        </div>
        <div style={{ ...getSizeStyle(828, 542) }} className="form-right"></div>
      </div>
    </Form>
  );
}
