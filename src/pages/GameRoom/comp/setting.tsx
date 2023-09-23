import { useSizeState } from '@/hooks/sizeContext';
import Form from '@/pages/GameHome/comp/DefaultForm';
import dscvr from '@/static/logo/dscvr.svg';
import openchat from '@/static/logo/openchat.jpg';
import mediaSetting from '@/static/resource/gameRoom/mediaSetting.png';
import switchOff from '@/static/resource/gameRoom/switchOff.png';
import switchOn from '@/static/resource/gameRoom/switchOn.png';
import twi from '@/static/resource/gameRoom/twi.png';
import voiceSetting from '@/static/resource/gameRoom/voiceSetting.png';
import { useState } from 'react';

export default function Setting({ close, open }) {
  const { getSizeStyle, w, h, sp } = useSizeState();

  const [audioOn, setAudioOn] = useState(false);
  const [musicOn, setMusicOn] = useState(false);

  function goTosite(type) {
    if (type == 'twitter') {
      window.open('https://twitter.com/IClandlord');
    } else if (type == 'openchat') {
      window.open(
        'https://oc.app/community/kuzi5-wiaaa-aaaar-ascgq-cai/channel/208061136764486177757385549404728664663'
      );
    } else if ('dscvr') {
      window.open('https://dscvr.ic0.app/u/IClandlord');
    }
  }

  return (
    <Form height={572} width={989} top={104} close={close} open={open} title="SETTING">
      <div className="content" style={{ display: 'flex', justifyContent: 'center', gap: w(43), marginTop: h(45) }}>
        <div
          className="setting-left"
          style={{ ...getSizeStyle(387, 421), paddingRight: w(53), backgroundImage: `url(${voiceSetting})` }}>
          <div
            className="AudioSetting"
            style={{
              marginLeft: w(53),
              marginTop: h(25),
              color: 'white',
              fontSize: sp(28),
              fontFamily: 'Oswald',
              fontWeight: '700',
              textTransform: 'uppercase',
              wordWrap: 'break-word',
            }}>
            AUDIO SETTING
          </div>

          <div
            style={{
              display: 'flex',
              marginLeft: 'auto',
              justifyContent: 'end',
              marginTop: h(90),
              alignItems: 'center',
            }}>
            <div
              style={{
                color: '#4C1D95',
                fontSize: sp(24),
                fontFamily: 'Oswald',
                fontWeight: '500',
                letterSpacing: 0.5,
                wordWrap: 'break-word',
              }}>
              Audio
            </div>
            <img
              onClick={() => {
                setAudioOn(!audioOn);
              }}
              style={{ marginLeft: w(12), width: w(133), height: h(47) }}
              src={audioOn ? switchOn : switchOff}
            />
          </div>

          <div
            style={{
              display: 'flex',
              marginLeft: 'auto',
              justifyContent: 'end',
              marginTop: h(68),
              alignItems: 'center',
            }}>
            <div
              style={{
                color: '#4C1D95',
                fontSize: sp(24),
                fontFamily: 'Oswald',
                fontWeight: '500',
                letterSpacing: 0.5,
                wordWrap: 'break-word',
              }}>
              Audio
            </div>
            <img
              onClick={() => {
                setMusicOn(!musicOn);
              }}
              style={{ marginLeft: w(12), width: w(133), height: h(47) }}
              src={musicOn ? switchOn : switchOff}
            />
          </div>
        </div>

        <div
          className="setting-right"
          style={{
            display: 'flex',
            flexDirection: 'column',
            ...getSizeStyle(387, 421),
            backgroundImage: `url(${mediaSetting})`,
          }}>
          <div
            className="AudioSetting"
            style={{
              marginTop: h(25),
              color: 'white',
              fontSize: sp(28),
              fontFamily: 'Oswald',
              fontWeight: '700',
              textTransform: 'uppercase',
              wordWrap: 'break-word',
            }}>
            GAME SERVICE
          </div>

          <div
            onClick={() => {
              goTosite('dscvr');
            }}
            style={{
              marginLeft: w(86),
              marginTop: h(52),
              display: 'flex',
              gap: w(22),
              alignItems: 'center',
              cursor: 'pointer',
            }}>
            <img style={{ width: w(52), height: h(53) }} src={dscvr} />
            <div
              style={{
                color: '#4C1D95',
                fontSize: 24,
                fontFamily: 'Oswald',
                fontWeight: '500',
                letterSpacing: 0.5,
                wordWrap: 'break-word',
              }}>
              DSCVR
            </div>
          </div>

          <div
            onClick={() => {
              goTosite('openchat');
            }}
            style={{
              marginLeft: w(86),
              marginTop: h(32),
              display: 'flex',
              gap: w(22),
              alignItems: 'center',
              cursor: 'pointer',
            }}>
            <img style={{ width: w(52), height: h(53) }} src={openchat} />
            <div
              style={{
                color: '#4C1D95',
                fontSize: 24,
                fontFamily: 'Oswald',
                fontWeight: '500',
                letterSpacing: 0.5,
                wordWrap: 'break-word',
              }}>
              Openchat
            </div>
          </div>

          <div
            onClick={() => {
              goTosite('twitter');
            }}
            style={{
              marginLeft: w(86),
              marginTop: h(32),
              display: 'flex',
              gap: w(22),
              alignItems: 'center',
              cursor: 'pointer',
            }}>
            <img style={{ width: w(52), height: h(53) }} src={twi} />
            <div
              style={{
                color: '#4C1D95',
                fontSize: 24,
                fontFamily: 'Oswald',
                fontWeight: '500',
                letterSpacing: 0.5,
                wordWrap: 'break-word',
              }}>
              Twitter
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
