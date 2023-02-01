import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [allDays, setAllDays] = useState([0, 0]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
    second: 0
  });

  useEffect(() => {
    const now = new Date();
    const dateInitial = new Date(`01/01/${now.getFullYear()}`);
    const dateEnd = new Date(`12/31/${now.getFullYear()}`);
    const difference1 = now.getTime() - dateInitial.getTime();
    const difference2 = dateEnd.getTime() - dateInitial.getTime();
    const days = Math.ceil(difference1 / 1000 / 60 / 60 / 24);
    const totalDays = Math.ceil(difference2 / 1000 / 60 / 60 / 24) + 1;

    setAllDays([days, totalDays]);
    setDate(new Date().toDateString());

    const interval = setInterval(() => {
      const initialTime = new Date().toTimeString().split(' ')[0].split(':');

      let hour = '0' + (23 - Number(initialTime[0]));
      hour = hour[hour.length-2] + hour[hour.length-1];

      let minute = '0' + (59 - Number(initialTime[1]));
      minute = minute[minute.length-2] + minute[minute.length-1];

      let second = '0' + (59 - Number(initialTime[2]));
      second = second[second.length-2] + second[second.length-1];

      setTime({ hour, minute, second })
    }, 1000);

    const intervalDay = setInterval(() => {
      const now = new Date();
      const dateInitial = new Date(`01/01/${now.getFullYear()}`);
      const dateEnd = new Date(`12/31/${now.getFullYear()}`);
      const difference1 = now.getTime() - dateInitial.getTime();
      const difference2 = dateEnd.getTime() - dateInitial.getTime();
      const days = Math.ceil(difference1 / 1000 / 60 / 60 / 24);
      const totalDays = Math.ceil(difference2 / 1000 / 60 / 60 / 24) + 1;
  
      setAllDays([days, totalDays]);
      setDate(new Date().toDateString());
    }, 86400000)

    return () => {
      clearInterval(interval);
      clearInterval(intervalDay);
    }
  }, [])


  return (
    <div className="container">
      <h1>Your time is running out</h1>

      <div className="content">
        <div className="clock">
          <div className="time">
            <p>{time.hour}</p>
            <span>:</span>
          </div>
          <div className="time">
            <p>{time.minute}</p>
            <span>:</span>
          </div>
          <div className="time">
            <p>{time.second}</p>
          </div>
        </div>
        <p className="days"> {allDays[1] - allDays[0]}</p>
      </div>

      <p className="date">{date}</p>
      <p className="day">{allDays[0]} / {allDays[1]}</p>

    </div>
  )
}

export default App
