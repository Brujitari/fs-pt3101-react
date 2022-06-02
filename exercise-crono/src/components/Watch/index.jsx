import { useState, useEffect } from "react"

export default function Watch() {

    const pad = (int) => {
        return int.toString().padStart(2, '0');
    }

    const getDate = () => {
        const date = new Date();
        return {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        }
    }

    const { hours, minutes, seconds } = getDate();

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