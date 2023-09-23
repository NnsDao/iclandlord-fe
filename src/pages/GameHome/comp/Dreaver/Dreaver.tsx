type IProps = {
    show: boolean
    children: any
    hide: Function
}

import { useSizeState } from '@/hooks/sizeContext'
import './index.css'

export default function Query(props: IProps) {

    const { show, children } = props;
    const { w, h, getSizeStyle, sp } = useSizeState()
    return (
        <>
            <div
                style={{
                    display: show ? "block" : "none",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    backgroundColor: "rgba(0,0,0,.3)",
                    zIndex: 400
                }}
                onClick={() => {
                    props.hide();
                }}
            ></div>
            <div className={show ? 'dreaver-content on' : 'dreaver-content'} 
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    ...getSizeStyle(1293, 780),
                    height: "100vh",
                    zIndex: 401,
                    backgroundColor: "#fff"
                }}
                onClick={e => {
                    e.stopPropagation();
                }}
            >
                {children}
            </div>

        </>



    );

}