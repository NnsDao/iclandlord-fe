import React from "react"
import pokesMap from '../pokes'

type IProps = {
    callback: Function
    item: any
    index: number
    getSizeStyle: any
    w: any
    h: any
    flag: boolean
  }
  
  class Pocker extends React.PureComponent<IProps, any> {
    constructor(props: IProps) {
      super(props);
  
      this.toggleFlag = this.toggleFlag.bind(this);
    }
  
     

  
    toggleFlag() {
      const { callback } = this.props;
      callback()
       
    }
  
    render() {
      const { item, index,flag } = this.props;
      // const {  } = this.props;
  
      return (
        <>
          <div
            onClick={this.toggleFlag}
            className={flag ? 'game-user-card on' : 'game-user-card'}
            key={item}
            style={{
              ...this.props.getSizeStyle(112, 168),
              marginLeft: index === 0 ? 0 : this.props.w(-60),
              transform: flag ? `translateY(${this.props.h(-20)})` : `translateY(0)`
            }}
          >
            <img style={{ ...this.props.getSizeStyle(112, 168) }} src={pokesMap[item.rank]} />
          </div>
  
        </>
  
      );
    }
  }

// function Pocker({ item, index, callback }) { 
//   const { getSizeStyle, w, h } = useSizeState();
//   if(item.isSelected) console.log(item);
//   const [flag, setflag] = useState(false); 
//   return (
//     <div
//       onClick={() => {
//         callback();
//         setflag(!flag);
//       }}
//       className={flag ? 'game-user-card on' : 'game-user-card'}
//       key={item}
//       style={{
//         ...getSizeStyle(112, 168),
//         marginLeft: index == 0 ? 0 : w(-60),
//         transform: flag ? `translateY(${h(-20)})` : `translateY(0)`,
//       }}>
//       <img style={{ ...getSizeStyle(112, 168), }} src={pokesMap[item.rank]} />
//     </div>
//   );
// }


  export default Pocker