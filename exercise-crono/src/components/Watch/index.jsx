import { useState, useEffect } from "react"
import './styles.sass'


const pad = (int) => {
    return int.toString().padStart(2, '0');
}

const getTime = () => {
    const date = new Date();
    return {
        hours: pad(date.getHours()),
        minutes: pad(date.getMinutes()),
        seconds: pad(date.getSeconds())
    }
}

export default function Watch() {
    const [time, setTime] = useState({
        hours: "00",
        minutes: "00",
        seconds: "00"
    })

    useEffect(() => {
        const id = setInterval(() => {
            setTime(getTime())
        }, 1000);
        return () => clearInterval(id);
    }, []);

    const { hours, minutes, seconds } = time;

    return (
        <section className="watch">
            <h1 className="watch__title">WATCH the time</h1>
            <h6 className="watch__subheading">in a watch...</h6>
            <time className="time">
                <span className="time__hours">{hours}</span>
                :
                <span className="time__minutes">{minutes}</span>
                :
                <span className="time__seconds">{seconds}</span>
            </time>
        </section>
    )
}