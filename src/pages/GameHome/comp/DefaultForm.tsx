import { useSizeState } from '@/hooks/sizeContext';
import { MouseEventHandler } from "react";
import './form.css';

type IProps = {
    open: boolean,
    close: MouseEventHandler<HTMLDivElement>,
    title: string
    children: JSX.Element
    bgUrl?: string
    width?: number
    height?: number
    header?: JSX.Element
    menuTop?: number
    menuLeft?: number
    top?: number
    titleStyle?: React.CSSProperties
    wrapStyle?: React.CSSProperties
}

export default function DefaultForm(props: IProps) {
    const { open, close, title, bgUrl, children, height, width, header, menuLeft, menuTop, top, titleStyle, wrapStyle = {} } = props
    const { getSizeStyle, h, sp, w } = useSizeState()
    return (
        <>

            <div onClick={close} className="mask" style={{display: open? 'block': 'none'}}>


            </div>


            <div style={{ ...getSizeStyle(width || 1031, height || 723), backgroundImage: bgUrl ? `url('${bgUrl}')` : '', top: top ? h(top): h(33), paddingTop: h(15), ...wrapStyle }} className={open ? 'form on' : 'form'}>


                {
                    header || <h1 style={{ fontSize: sp(40), ...titleStyle }} className='form-title'>
                        {title}
                    </h1>
                }
                {/* 关闭按钮 */}
                <div style={{ ...getSizeStyle(90, 90), top: menuTop ? h(menuTop) : h(-30), right: menuLeft ? w(menuLeft) : w(-30), }} onClick={close} className='close-btn scale-touch'>
                </div>

                {
                    children
                }
            </div>

        </>


    )
}