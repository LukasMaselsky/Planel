import useTime from "../../hooks/useTime";

export default function Time() {
    const time = useTime();

    return (
        <div className="text-5xl">
            {(time.hours < 10 ? "0" + time.hours : time.hours) +
                ":" +
                (time.minutes < 10 ? "0" + time.minutes : time.minutes) +
                ":" +
                (time.seconds < 10 ? "0" + time.seconds : time.seconds)}
        </div>
    );
}
