import MotionDropDiv from "../MotionDropDiv";
type Props = {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
    color: string;
    location: string;
    day: string;
    deleteSlot: (id: number, name: string, day: string) => void;
};

export default function ScheduleItem({
    color,
    startTime,
    endTime,
    location,
    deleteSlot,
    id,
    name,
    day,
}: Props) {
    return (
        <MotionDropDiv
            duration={0.3}
            multiple={true}
            className={"flex w-full flex-col gap-2"}
        >
            <div
                className={
                    "flex w-full flex-col gap-1 rounded-lg border-[1px] border-text bg-bg px-2 py-1 text-text"
                }
                style={{ boxShadow: `0px 3px 0px 0px ${color}` }}
            >
                <div className="flex items-center justify-between">
                    <p className="line-clamp-1 text-ellipsis text-xl">{name}</p>
                    <p className="line-clamp-1 overflow-hidden text-ellipsis text-base">
                        {startTime} - {endTime}
                    </p>
                </div>
                <div className="flex justify-between font-light">
                    <p>{location}</p>
                    <button
                        onClick={() => deleteSlot(id, name, day)}
                        className="rounded-md border-[1px] border-text bg-bg px-1"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </MotionDropDiv>
    );
}
