import { useSizeState } from '@/hooks/sizeContext'
import coin from '@/static/resource/coin.png'
import diamond from '@/static/resource/diamond.png'
import vipAvatar from '@/static/resource/form/vipAvatar.png'
import gift from '@/static/resource/form/vipGift.png'
import vipBg from '@/static/resource/form/vipformBg.png'
import Form from '../DefaultForm'
import './index.css'

export default function Vip({ open, close }) {

    const { w, h, font, sp, getSizeStyle } = useSizeState()

    function buildHeader() {
        return <div style={{ ...getSizeStyle(466, 90), marginTop: h(29) }} className='vip-header'></div>
    }

    return <Form menuTop={42} height={658} width={1183} bgUrl={vipBg} title='' open={open} close={close} header={buildHeader()} >

        <div className='vip-container'>
            <div className='vip-content'>

                <div style={{ ...getSizeStyle(378, 578), marginTop: h(-49) }} className='left'>

                    <img style={{...getSizeStyle(378, 578),}} src='src/static/resource/form/vipRole.png'/>
                </div>

                <div style={{ marginLeft:w(-51), marginTop: h(-14) }} className='right'>
                    <button style={{ ...getSizeStyle(33, 57), marginTop: h(132) }} className='change prev'></button>

                    <div className='' style={{ marginLeft: w(16), marginRight: w(16), width: w(794), }}>

                        <div style={{ ...getSizeStyle(794, 280) }} className='vip-top'>

                            <h2 className='vip-top-title' style={{ margin: `0 auto`, fontSize: sp(24) }}>VIP privileges</h2>


                            <div className='vip-info-line'>
                                <h2 style={{ margin: 0, marginLeft: w(89), marginRight: w(16), fontSize: sp(32) }}>Deposit</h2>
                                <img style={{ ...getSizeStyle(36, 30), marginRight: w(49), marginTop: h(12) }} src={diamond} />

                                <h2 style={{ margin: 0, fontSize: sp(24), marginRight: w(128) }}>100</h2>
                                <h2 style={{ margin: 0, fontSize: sp(24), marginRight: w(20) }}>VIP1</h2>


                                <h2 style={{ margin: 0, fontSize: sp(32), whiteSpace: 'nowrap' }}>privileges available</h2>
                            </div>


                            <div style={{ display: 'flex', marginLeft: w(16) }}>
                                <div className='vip-avatar-box'>
                                    <img style={{ ...getSizeStyle(130, 130), marginLeft: w(13), display: 'block', marginTop: h(18) }} src={vipAvatar} />
                                    <div className='vip-nickname' style={{ fontSize: sp(18), }}>VIP Exclusive Avatar Box</div>
                                </div>

                                <div style={{ ...getSizeStyle(465, 173), marginRight: w(34), marginTop: h(9), padding: `${w(16)} ${h(19)}` }} className='vip-info-box'>
                                    <div style={{marginBottom: h(23)}} className='vip-info-line'>
                                        <div>Cumulative Signing to Rewards</div>
                                        <div className='vip-info-get'>GET</div>
                                    </div>

                                    <div style={{marginBottom: h(23)}} className='vip-info-line'>
                                        <div>Cumulative Signing to Rewards</div>
                                        <div className='vip-info-get'>GET</div>
                                    </div>

                                    <div style={{marginBottom: h(23)}} className='vip-info-line'>
                                        <div>Cumulative Signing to Rewards</div>
                                        <div className='vip-info-get scale-touch'>GET</div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div style={{ ...getSizeStyle(794, 165), marginTop: h(7) }} className='vip-bottom'>
                            <h2 className='vip-bottom-box-title' style={{margin: 0, ...font(24)}}>VIP1 Premium Package</h2>

                            <div className='vip-bottom-line'>
                                <img style={{...getSizeStyle(101, 113), marginLeft: w(17), zIndex: 2}} src={gift}/>
                                <div style={{...getSizeStyle(279, 50), marginTop: h(32), marginLeft: w(-31), paddingLeft: w(18)}} className='gift-line'>

                                    <div className='vip-token-useing' style={{...font(20)}}>Token Using</div>

                                    <img style={{width: w(34), height: h(37)}} src={coin}/>

                                    <div style={{...font(24)}} className='vip-using'>16.66W</div>
                                </div>


                                <div style={{marginTop: h(22), marginLeft: w(16)}}>
                                    <div style={{...font(20)}} className='origin-price'>Original Price：110</div>
                                    <div style={{...font(20)}} className='discount-price'>Discount Price：100</div>
                                </div>

                                <div style={{...getSizeStyle(181, 72), marginTop: h(19), marginRight: w(5)}} className='buy-now scale-touch'>Buy Now</div>
                            </div>

                        </div>


                    </div>


                    <button style={{ ...getSizeStyle(33, 57), marginTop: h(132) }} className='change next'></button>

                </div>



            </div>


            <div className='vip-footer' style={{ ...getSizeStyle(1184, 115), marginTop: h(-70) }}>
                <h2 className='current-level' style={{...font(28), marginLeft: w(36), marginRight: w(20)}}>Current Level</h2>
                <h2 className='vip-level' style={{...font(48)}}>VIP0</h2>


                <div style={{marginLeft: w(82)}}>
                    <div className='level-progress' style={{}}>
                        <h2 style={{...font(24)}}>Continue top-up</h2>    
                        <img style={{...getSizeStyle(31, 26), marginRight: w(3), marginLeft: w(10)}} src={diamond}/>
                        <h2 className='yellow' style={{...font(28)}}>100</h2>
                        <h2 style={{...font(24), marginLeft: w(40), marginRight: w(10)}}>Upgrade to</h2>
                        <h2 className='yellow' style={{...font(28)}}>VIP1</h2>
                    </div>
                    <div style={{...getSizeStyle(441, 23), marginTop: h(15)}} className='progress'></div>
                </div>

                <div className='deposit' style={{...getSizeStyle(300, 87), marginRight: w(10), fontSize: sp(30), lineHeight: h(87), textIndent: w(49)}}>Deposit</div>
            </div>
        </div>

    </Form>
}

