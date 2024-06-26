import useTime from "../../hooks/useTime";

export default function Time() {
    const time = useTime();

    return (
        <div className="flex justify-center text-5xl text-text">
            {(time.hours < 10 ? "0" + time.hours : time.hours) +
                ":" +
                (time.minutes < 10 ? "0" + time.minutes : time.minutes) +
                ":" +
                (time.seconds < 10 ? "0" + time.seconds : time.seconds)}
        </div>
    );
}
