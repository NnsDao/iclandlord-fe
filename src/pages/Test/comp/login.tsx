import { useSizeState } from '@/hooks/sizeContext';
import Form from '@/pages/GameHome/comp/DefaultForm';
import google from '@/static/resource/landing/google.png';
import ic from '@/static/resource/landing/ic.png';
import me from '@/static/resource/landing/me.png';
import nfid from '@/static/resource/landing/nfid.png';

export default function Login({ open, close, icLogin, nfidLogin, meWalletLogin }) {
  const { w, h, sp } = useSizeState();

  const isLoginStatus = localStorage.getItem('isLoginStatus');

  return (
    <Form
      title=""
      header={<></>}
      open={open}
      width={800}
      height={560}
      top={110}
      wrapStyle={{
        display: 'flex',
        justifyContent: 'center',
        padding: 0,
        alignItems: 'center',
        borderRadius: w(12),
        border: '1px solid #78737E',
        background: '#4F3C5D',
        paddingTop: 0,
      }}
      close={close}>
      <div className="inner-wrap" style={{ height: h(544), width: w(784) }}>
        <h2 style={{ marginTop: h(40), fontWeight: 'bold', textShadow: '#202020 0 3px 3px' }}>Connect Web3 Identity</h2>
        <h3
          style={{
            fontWeight: '400',
            margin: '0 auto',
            fontSize: sp(22),
            color: '#fff',
            textShadow: '#202020 0 3px 3px',
          }}>
          You need to connect an identity
        </h3>

        <div
          className="login-choses"
          style={{
            border: '1px solid #fff',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            height: h(348),
            width: w(704),
            margin: '0 auto',
            marginTop: h(32),
            borderRadius: sp(24),
          }}>
          <div onClick={icLogin} className="login-item" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.30)' }}>
            {isLoginStatus == '1' ? (
              <>
                <div className="login-status"> Last Used</div>
              </>
            ) : (
              ''
            )}
            <img className="scale-touch" style={{ width: w(80), height: h(48) }} src={ic} />

            <h3 style={{ fontSize: sp(28) }}>Internet identity</h3>
          </div>

          <div className="login-item" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.30)' }}>
            <div className="login-status-black"> Comming</div>
            <img className="scale-touch" style={{ width: w(80), height: h(48) }} src={google} />

            <h3 style={{ fontSize: sp(28) }}>Google</h3>
          </div>

          <div
            // onClick={meWalletLogin}
            className="login-item"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.30)' }}>
            <div className="login-status-black"> Comming</div>
            {isLoginStatus == '3' ? (
              <>
                <div className="login-status"> Last Used</div>
              </>
            ) : (
              ''
            )}
            <img className="scale-touch" style={{ width: w(80), height: h(48) }} src={me} />

            <h3 style={{ fontSize: sp(28) }}>Me wallet</h3>
          </div>

          <div
            onClick={nfidLogin}
            className="login-item"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.30)' }}>
            {isLoginStatus == '2' ? (
              <>
                <div className="login-status"> Last Used</div>
              </>
            ) : (
              ''
            )}
            <img className="scale-touch" style={{ width: w(80), height: h(48) }} src={nfid} />
            <h3 style={{ fontSize: sp(28) }}>NFID</h3>
          </div>
        </div>
      </div>
    </Form>
  );
}
