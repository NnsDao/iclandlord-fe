import { previewPopupFile } from '@/components/previewPopupFile';
import Serves from '@/hooks/Serves';
import { useSizeState } from '@/hooks/sizeContext';
import { useGlobalContext } from '@/hooks/Store/Store';
import avalible from '@/static/resource/form/avalible.svg';
import confirmBg from '@/static/resource/form/confirmBg.png';
import signBg from '@/static/resource/form/signBg.png';
import siginItemBg from '@/static/resource/form/signItemBg.png';
import signTitle from '@/static/resource/form/signTitle.png';
import Form from '../DefaultForm';
import './index.css';

export default function Sign({ open, close, signCallback }) {
  const { getSizeStyle, w, h, font } = useSizeState();

  const {
    state: { principal },
  } = useGlobalContext();

  async function handleConfirm() {
    const res = await Serves.actor
      .mint_points()
      .finally(() => {
        close();
      })
      .catch(() => {
        previewPopupFile({ txt: 'time No more than 24 hours' });
      });
    console.log(res, 2929292929);

    if (!res) {
      previewPopupFile({ txt: 'Claim Success, Pls check your wallet!' });
    } else {
      previewPopupFile({ txt: 'You can claim a token every 24 hours.' });
    }
    const _res = await Serves.actor.get_points();
    signCallback(_res);
  }

  function buildHeader() {
    return (
      <div>
        <div>
          <img style={{ ...getSizeStyle(714, 70), marginTop: h(12) }} src={signTitle} />
        </div>
        <div className="sign-title-txt " style={{ marginTop: h(-28), ...font(20) }}>
          Remember to check in every day! 0 consecutive days
        </div>
      </div>
    );
  }

  return (
    <Form header={buildHeader()} title="" height={662} width={1297} bgUrl={signBg} top={51} close={close} open={open}>
      <div style={{ justifyContent: 'center', marginTop: '100px' }}>
        {/* <div style={{ display: 'flex', justifyContent: 'center', gap: w(50), marginTop: h(32) }}>
          <SignItem key="1500" picUrl={coin} day={1} name={'1500TOEKN'} />
          <SignItem key="2000" picUrl={coin} day={2} name={'2000TOEKN'} />
          <SignItem key="2500" picUrl={coin} day={3} name={'2500TOEKN'} />
          <SignItem key="3000" picUrl={coin} day={4} name={'3000TOEKN'} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: w(50), marginTop: h(22) }}>
          <SignItem key="3500" picUrl={coin} day={1} name={'3500TOEKN'} />
          <SignItem key="4000" picUrl={coin} day={2} name={'4000TOEKN'} />
          <SignItem key="5000" picUrl={coin} day={3} name={'5000TOEKN'} />
        </div> */}

        <div
          onClick={handleConfirm}
          className="scale-touch sign-btn"
          style={{ backgroundImage: `url(${confirmBg})`, ...getSizeStyle(260, 94) }}>
          <span style={{ ...font(38) }}>Claim</span>
        </div>
      </div>
    </Form>
  );
}

function SignItem({ picUrl, name, day }) {
  const { w, h, getSizeStyle, font } = useSizeState();

  function buildTag() {
    return (
      <div style={{ position: 'absolute', left: '50%', translate: '-50% 0', top: 0, width: w(124), height: h(92) }}>
        {/* 是否已经领取，是否可以领取 */}
        {/* <img src={usedTag} style={{...getSizeStyle(124, 92)}}/> */}
        <img src={avalible} style={{ ...getSizeStyle(124, 92) }} />
      </div>
    );
  }

  return (
    <div style={{ backgroundImage: `url(${siginItemBg})`, ...getSizeStyle(192, 193) }}>
      <div className="sign-item-day" style={{ lineHeight: h(30) }}>
        <span style={{ ...font(20) }}>{day} DAY</span>
      </div>

      <div style={{ marginTop: h(15), position: 'relative' }}>
        <img src={picUrl} style={{ ...getSizeStyle(88, 88) }} alt="" />
        {buildTag()}
      </div>

      <div className="sign-item-name" style={{ height: h(20), marginTop: h(-15) }}>
        <span style={{ ...font(20) }}>{name}</span>
      </div>
    </div>
  );
}
