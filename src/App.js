import React, { useState, useRef, useEffect } from 'react';
import './App.css';
const App = () => {
  const Ref = useRef(null);

  const [timer, setTimer] = useState('05:00');
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, SetinitialTime] = useState(300);
  const [isBlinking, setIsBlinking] = useState(false);
  const getTimeRem = (e) => {
    const tot = Date.parse(e) - Date.parse(new Date());
    const sec = Math.floor((tot / 1000) % 60);
    const min = Math.floor((tot / 1000 / 60) % 60);
    return {
      tot, min, sec
    };
  }
  const startTimer = (e) => {
    let { tot, min, sec } = getTimeRem(e);
    if (tot >= 0) {
      setTimer(
        (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec)
      );
      setIsBlinking(tot < 30000);
    }
  };
  const clearTIme = (e) => {
    setTimer('05:00');
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadine = new Date();
    deadine.setSeconds(deadine.getSeconds() + initialTime);
    return deadine;
  }
  useEffect(() => {
    if (isRunning) {
      clearTIme(getDeadTime());
    }
  }, [isRunning, initialTime]);

  const onClickStart = () => {
    setIsRunning(true);
  };

  const onClickStop = () => {
    setIsRunning(false);
    if (Ref.current) clearInterval(Ref.current);
  };

  const onClickReset = () => {
    setIsRunning(false);
    SetinitialTime(300);
    setTimer('05:00');
  };
  
  return (
    <div className="App">
      <div className="box">
        <h2 className={`center ${isBlinking ? 'blink' : ''} ${isBlinking ? 'red' : 'white'}`}>{timer}</h2>
        <div className="button-cont">
          <button onClick={onClickStart} className='btn'>Start</button>
          <button onClick={onClickStop} className='btn'>Stop</button>
          <button onClick={onClickReset} className='btn-reset'>Reset</button>
        </div>
      </div>
    </div>
  );
};
export default App;