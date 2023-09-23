
import defForm from '@/static/resource/defForm.png';

const mountElement = document.createElement("div") //创建一个div元素，用来作为弹窗最大的父元素

mountElement.style.backgroundImage = `url(${defForm})`
mountElement.style.position = 'fixed'
mountElement.style.width = '80vw'
mountElement.style.height = '60px'
mountElement.style.zIndex = '1000'
mountElement.style.left = '50%'
mountElement.style.top = '50%'
mountElement.style.fontSize = '1.4rem'
mountElement.style.color = '#FFE6A6'
mountElement.style.fontWeight = 'bold'
mountElement.style.display = 'flex'
mountElement.style.justifyContent = 'center'
mountElement.style.alignItems = 'center'
mountElement.style.transition = '0.32s'
mountElement.style.transform =  'translate(-50%, -50%)'




export function previewPopupFile ({txt = '通知'} ) {

mountElement.style.opacity = '1';
    mountElement.innerText = txt
    document.body.appendChild(mountElement)

    setTimeout(() => {
        mountElement.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(mountElement)
        }, 200);
        
    }, 1000);
  }
  