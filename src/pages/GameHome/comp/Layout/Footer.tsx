import { useSizeState } from '@/hooks/sizeContext';
// import bag from '@/static/resource/bag.png'
// import bonus from '@/static/resource/bonus.png'
import sign from '@/static/resource/sign.png';
import wallet from '@/static/resource/wallet.png';

export default function Footer({ setWalletOpen, setBonusOpen, setSignShow }) {
  const { getSizeStyle, h, w, sp } = useSizeState();
  return (
    <div style={{ height: h(110) }} className="game-footer">
      <div className="footer-left">
        <div style={getSizeStyle(49, 49)} className="bread"></div>

        <div
          className="footer-item scale-touch"
          onClick={() => {
            setSignShow(true);
          }}>
          <div style={{ width: w(57), height: h(57) }} className="item-img">
            <img style={{ width: w(57), height: h(57) }} src={sign} />
          </div>

          <div style={{ fontSize: sp(32) }} className="item-word">
            Sign
          </div>
        </div>

        <div
          onClick={() => {
            setWalletOpen(true);
          }}
          className="footer-item scale-touch">
          <div style={{ width: w(57), height: h(57) }} className="item-img">
            <img style={{ width: w(57), height: h(57) }} src={wallet} />
          </div>

          <div style={{ fontSize: sp(32) }} className="item-word">
            Wallet
          </div>
        </div>
        {/* bottom menu */}
        {/* <div onClick={() => { setBonusOpen(true) }} className='footer-item scale-touch'>
                    <div style={{ width: w(57), height: h(57) }} className='item-img'>
                        <img style={{ width: w(57), height: h(57) }} src={bonus} />
                    </div>


                    <div style={{ fontSize: sp(32) }} className='item-word'>Bonus</div>
                </div>


                <div className='footer-item scale-touch'>
                    <div style={{ width: w(57), height: h(57) }} className='item-img'>
                        <img style={{ width: w(57), height: h(57) }} src={bag} />
                    </div>


                    <div style={{ fontSize: sp(32) }} className='item-word'>Bag</div>
                </div> */}
      </div>
    </div>
  );
}
