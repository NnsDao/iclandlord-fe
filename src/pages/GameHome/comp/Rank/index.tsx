import { useSizeState } from "@/hooks/sizeContext"
import coin from '@/static/resource/coin.png'
import defultAvatar from '@/static/resource/defaultAvatar.png'
import rankActive from '@/static/resource/form/rankActive.png'
import rankNumber from '@/static/resource/form/rankNumber.png'
import rankWin from '@/static/resource/form/rankWin.png'
import BScroll from "better-scroll"
import { useEffect, useRef, useState } from "react"
import Dreaver from "../Dreaver/Dreaver"
import './index.css'



export default function Rank({ setRankShow, rankShow }) {

    const { w, font, h, getSizeStyle, sp } = useSizeState()

    const [tabIndex, setTabIndex] = useState(0)
    const wrapRef = useRef()

    const rankTabs = [{
        icon: coin,
        title: 'Token'
    },
    {
        icon: rankWin,
        title: 'VIP'
    }]
    function rankItems() {
        return rankTabs.map((it, i) => (
            <div key={i} onClick={() => { setTabIndex(i) }} style={{ ...getSizeStyle(248, 97), padding: `${h(19)} ${w(16)}`, backgroundImage: tabIndex == i ? `url(${rankActive})`:'' }} className={tabIndex == i ? 'rank-tab on' : 'rank-tab'}>
                <img style={{ width: w(60), height: h(37), margin: 'auto' }} src={it.icon} />
                <div>
                    <h2 style={{ ...font(22) }}>{it.title}</h2>
                    <h2 style={{ ...font(22) }}>Leaderboard</h2>
                </div>

            </div>
        ))
    }

    useEffect(() => {

        let scroll = new BScroll(wrapRef.current as any, {
            movable: true,
        }) 
    }, [])


    function buildRankItem() {
        return (
            <div className="rank-item" style={{ ...getSizeStyle(639, 99) }}>

                <div style={{ width: w(180), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img style={{ width: w(82), height: h(62), display: 'block', margin: 'auto' }} src={rankNumber} />
                </div>

                <div style={{ width: w(85), display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="rank-user-avatar">

                    <img style={{ width: w(85), height: h(85) }} src={defultAvatar} />
                </div>

                <div className="rank-user-nickname" style={{ marginLeft: w(43) }}>NickName</div>

                <div className="vip-rank" style={{ marginLeft: 'auto', marginRight: w(52) }}>10</div>

            </div>
        )
    }


    return (
        <Dreaver hide={() => { setRankShow(false) }} show={rankShow} >
            <div className='rank-container'>

                <div onClick={() => {setRankShow(false)}} className="arrow-close" style={{...getSizeStyle(44, 70), right: w(-56), display: rankShow ? 'block' :'none' }}></div>

                <div style={{ width: w(248), alignItems: 'start', height: '100vh', justifyContent: 'start' }} className='rank-left'>

                    <h2 style={{ ...font(44) }} className='rank-title'>Rank</h2>

                    {rankItems()}

                </div>



                <div className="rank-main" style={{}}>

                    <div className="rank-main-header" style={{ height: h(58), paddingTop: h(6) }}>


                        <h2 style={{ marginLeft: w(42), marginRight: w(199), ...font(32) }}>Rank</h2>

                        <h2 style={{ marginRight: w(68), ...font(32) }}>Nickname</h2>

                        <h2 style={{ ...font(32) }}>VIP Rank</h2>


                        <div className="rank-desc" style={{ ...getSizeStyle(334, 58), marginLeft: 'auto', marginRight: w(40), marginTop: h(-6) }}>

                            <span style={{ ...font(25), WebkitTextStroke: `${sp(1)} #7C2D12` }}>Leaderboard Description</span>
                        </div>
                    </div>

                    <div className="rank-main-content" >

                        <div className="scroll-rank-content-left">
                            <div ref={wrapRef as any} id="scroll-rank-list" className="scroll-rank-list" style={{ height: `calc(100vh - ${h(164 + 58)})`, paddingTop: h(8) }}>
                                <div>
                                    {buildRankItem()}{buildRankItem()}{buildRankItem()}{buildRankItem()}{buildRankItem()}{buildRankItem()}{buildRankItem()}{buildRankItem()}


                                </div>


                            </div>

                            <div className="my-rank-info" style={{ height: h(164), paddingTop: h(18) }}>

                                <h2 style={{ ...font(32) }}>My Ranking</h2>

                                {buildRankItem()}
                            </div>

                        </div>




                        <div className="scroll-rank-content-right" style={{ width: w(377) }}>
                            <h2 style={{ ...font(30), marginTop: h(30), WebkitTextStroke: `${sp(1)} #000000` }} className="worshop-index">Membrane Worship Index
                            </h2>

                            <ul className="rank-rules" style={{ marginTop: h(20), width: w(331) }}>
                                <li style={{ ...font(20), marginBottom: h(8) }}>
                                    1.Leaderboard Statistics vip players only
                                </li>

                                <li style={{ ...font(20), marginBottom: h(8) }}> 2.Top 50 Players on the Showcase Platform </li>
                                <li style={{ ...font(20), marginBottom: h(8) }}>3.VIP Ranking is based on the VIP level of the player</li>
                                <li style={{ ...font(20), marginBottom: h(8) }}> 4.Players at the same vip level rank by account level </li>
                                <li style={{ ...font(20), marginBottom: h(8) }}>
                                    5.VIP Charts Daily Update Results
                                </li>
                            </ul>


                            <div className="scale-touch great-god" style={{ ...getSizeStyle(346, 77), marginBottom: h(22) }}>

                                <span style={{ ...font(25), WebkitTextStroke: `${sp(1)} #7C2D12` }}>
                                    Worship of the Great God
                                </span>
                            </div>

                        </div>


                    </div>


                </div>
            </div>
        </Dreaver>
    )
}