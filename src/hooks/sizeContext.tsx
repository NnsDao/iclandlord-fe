import React, { useContext, useEffect, useState } from "react";

type sizeState = {
    h: Function
    w: Function
    getSizeStyle: Function
    sp: Function
    font: Function
    wNumber: Function
    hNumber: Function
    handleResize: Function
}

type reducer = () => sizeState

const initialState: sizeState = {
    h: () => { },
    w: () => { },
    font: () => { },
    getSizeStyle: () => { },
    sp: () => { },
    wNumber: ()=>{}, 
    hNumber: () => {},
    handleResize: () => {}
}

export const SizeContext = React.createContext<ReturnType<reducer>>(initialState);


function debounce(callback: Function) {
    let timer: any = null

    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback()
        }, 100)



    }
}

 

function useSize(): sizeState {
    // 设计稿的尺寸 像素值
    const size = {
        width: 1688,
        height: 780,
        fontSize: 1,
    }
    let _screen: HTMLElement = document.body

    const [hPer, setHPer] = useState(_screen.clientHeight / size.height)

    const [wPer, setWPer] = useState(_screen.clientWidth / size.width)

    const h = (height: number) => {
        return hPer * height + 'px'
    }

    const hNumber = (height: number) => {
        return hPer * height
    }

    const w = (width: number) => {
        return wPer * width + 'px'
    }

    const wNumber = (width: number) => {
        return width * wPer
    }
    const sp = (fontSize: number) => {
        return fontSize * (_screen.clientWidth / size.width) + 'px'
    }


    const font = (fontSize: number): React.CSSProperties => {
        const target = fontSize * wPer
        if (target < 12) {
            // 谷歌内核字体不能低于12px
            return {
                fontSize: '12px',
                scale: `${(target / 12)}`,
                zoom: `${(target / 12)}`
            }
        }
        return {
            fontSize: target + 'px'
        }
    }

    const getSizeStyle = (width: number, height: number): React.CSSProperties => {
        const computedHeight = h(height)
        const computedWidth = w(width)
        return {
            height: computedHeight,
            width: computedWidth,
            backgroundSize: `${computedWidth} ${computedHeight}`,
        }
    }
    const handleResize = debounce(async () => {
        _screen = document.body
        if (_screen.clientWidth < _screen.clientHeight) {

            // await screen.orientation
            //     .lock('landscape')
            // .catch(e => alert(e.message));
        }
        setHPer(window.innerHeight / size.height)
        setWPer(_screen.clientWidth / size.width)
        var html = document.getElementsByTagName("html")[0];
        html.style.fontSize = (_screen.clientWidth / size.width) * 24 + "px";
        console.log(html.style.fontSize);
    })

    useEffect(() => {
        
        handleResize()
        window.addEventListener("resize", () => {
            handleResize()
        });
        document.body.addEventListener(
            'touchmove',
            function (e) {
                e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
            },
            { passive: false }
        ) // 

        document.addEventListener('touchmove', touchmove, {
            passive: false,
          })
          
          function touchmove(e) {
            e = e || window.event
            // do something
            e.preventDefault()
          }
          


    }, [])





    return {
        h, w, getSizeStyle, sp, font, wNumber, hNumber, handleResize
    }
}




// XXX.tsx 注入context
const GlobalSizeProvider = ({ children }) => {
    const state = useSize()


    return <SizeContext.Provider value={state}>
        {children}
    </SizeContext.Provider>
}


export default GlobalSizeProvider

export const useSizeState = () => useContext(SizeContext);
