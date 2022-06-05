import { useState, useEffect } from "react"
import './styles.sass'

const pad = (int, padding = 2) => {
    return int.toString().padStart(padding, '0');
}

const baseTime = {
    hours: "00",
    minutes: "00",
    seconds: "00",
    miliseconds: "000"
}

export default function Watch() {
    const [time, setTime] = useState(baseTime);
    const [isActive, setIsActive] = useState(false)
    const [isStopped, setIsStopped] = useState(false) 
    const [stamps, setStamps] = useState([])

    const getNextNumber = (str, padding, inc = 1) => {
        const number = Number(str)
        const result = number + inc
        return pad(result, padding)
    }

    
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                if (miliseconds >= 1000) {
                    setTime({
                        hours,
                        minutes,
                        seconds: getNextNumber(seconds),
                        miliseconds: pad(0, 3)
                    })
                };
                if (seconds >= 60) {
                    setTime({
                        hours,
                        minutes: getNextNumber(minutes),
                        seconds: pad(0),
                        miliseconds
                    })
                };
                if (minutes >= 60) {
                    setTime({
                        hours: getNextNumber(hours),
                        minutes: pad(0),
                        seconds,
                        miliseconds
                    })
                };
                if (
                    miliseconds < 1000 &&
                    seconds < 60 &&
                    minutes < 60
                ) {
                    setTime({
                        hours,
                        minutes,
                        seconds,
                        miliseconds: getNextNumber(miliseconds, 3, 1)
                    });
                }
            }, 1)
        }
        if (!isActive) {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [isActive, time])


    const stop = () => {
        setIsActive(false);
        setIsStopped(!isStopped)
    };

    const reset = () => {
        setTime(baseTime);
        setIsActive(false);
        setIsStopped(false);
        setStamps([])
    };

    const handleClickStart = () => {
        setIsActive(!isActive)
    };

    const handleClickStop = () => {
        if(!isStopped) {
            stop();
            return;
        }
        reset()
    };


    const handleClickSplit = () => {
        const newTime = time;
        const newStamp = `${newTime.hours}:${newTime.minutes}:${newTime.seconds}:${newTime.miliseconds}`
        setStamps(prev => [...prev, newStamp]);
    }

    const isActiveFn = () => isActive ? "Pause" : "Start";


    const { hours, minutes, seconds, miliseconds } = time;

    return (
        <section className="watch">
            <h1 className="watch__title">STOPWATCH</h1>
            <h6 className="watch__subheading">🏳‍🌈 Happy Pride Month 🏳‍🌈</h6>
            <time className="time">
                <span className="time__hours">{hours}</span>
                :
                <span className="time__minutes">{minutes}</span>
                :
                <span className="time__seconds">{seconds}</span>
                :
                <span className="time__miliseconds">{miliseconds}</span>
            </time>
            <section className="watch__buttons">
                {isStopped? '' : <button className="watch__buttons--start button" onClick={handleClickStart}>{isActiveFn()}</button>}
                <button className="watch__buttons--stop button" onClick={handleClickStop}>{isStopped? "Restart" : "Stop"}</button>
                {!isActive? '' : <button className="watch__buttons--split button" onClick={handleClickSplit}>Split</button>}
            </section>
            <ul className="timeStamps">
                {stamps.length? stamps.map(stamp => <li className="stamp">{stamp}</li>) : ''}
            </ul>
        </section>
    )
}