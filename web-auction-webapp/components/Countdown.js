import {useState} from "react";
import Swal from "sweetalert2";

const Countdown = (date_ini) => {

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [date, setDate] = useState(Date.parse(date_ini.date))

    let now = new Date().getTime();
    let distance = date - now;

    if (distance > 0) {

        let x = setInterval(function () {
            now = new Date().getTime();
            distance = date - now;
            setDays(Math.floor(distance / (1000 * 60 * 60 * 24)))
            setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
            setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))
            setSeconds(Math.floor((distance % (1000 * 60)) / 1000))

            if (distance < 0) {
                clearInterval(x);
                Swal.fire({
                    title: 'Auction Time Expired',
                    icon: 'info'
                })
            }
        }, 1000);
    }

    return (
        <div>
            <h3 className="text-2xl text-black font-bold">{days}d {hours}h {minutes}m {seconds}s</h3>
        </div>
    )
}

export default Countdown;