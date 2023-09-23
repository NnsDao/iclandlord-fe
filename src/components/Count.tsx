import { useRef, useState } from 'react';

export default function Counter({ style, time }: { style: React.CSSProperties; time: number }) {
  const [timeState, setTimeState] = useState(time);
  const timer = useRef(
    setTimeout(() => {
      if (timeState == 0) {
        setTimeState(0);
        return;
      }
      setTimeState(timeState - 1);
    }, 1000)
  );

  return <h2 style={style}>{timeState}</h2>;
}
