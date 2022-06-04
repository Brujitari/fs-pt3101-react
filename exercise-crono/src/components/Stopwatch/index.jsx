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

    const getNextNumber = (int, padding, inc = 1) => {
        const number = Number(int)
        const result = number + inc
        return pad(result, padding)
    }

    const toggle = () => {
        setIsActive(!isActive);
    }

    const stop = () => {
        setIsActive(false);
        setIsStopped(!isStopped)
    }

    const reset = () => {
        setTime(baseTime);
        setIsActive(false);
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
                        miliseconds: getNextNumber(miliseconds, 3, 10)
                    });
                }
            }, 10)
        }
        if (!isActive) {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [isActive, time.miliseconds])

    const handleClickStart = () => {
        toggle()
    }

    const handleClickStop = () => {
        stop()
    }



    const { hours, minutes, seconds, miliseconds } = time;

    return (
        <section className="watch">
            <h1 className="watch__title">STOP the time</h1>
            <h6 className="watch__subheading">...like Dio</h6>
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
                {isStopped? '' : <button className="watch__buttons--start button" onClick={handleClickStart}>{isActive? "Pause" : "Start"}</button>}
                <button className="watch__buttons--stop button" onClick={handleClickStop}>Stop</button>
                {isStopped? '' : <button className="watch__buttons--split button">Split</button>}
            </section>
        </section>
    )
}