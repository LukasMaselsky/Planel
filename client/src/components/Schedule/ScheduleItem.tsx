import { Schedule } from "./Schedule";

interface Props {
    classes: Schedule["classes"];
    day: string;
    deleteSlot: (id: number, day: string) => void;
}

export default function ScheduleItem({ classes, day, deleteSlot }: Props) {
    return (
        <div className="flex h-full w-full flex-col gap-2 overflow-y-auto pb-1">
            {classes?.length == 0 || !classes ? (
                <div className="flex h-full w-full items-center justify-center">
                    <p>No classes yet</p>
                </div>
            ) : null}
            {classes?.map((c, i: number) => (
                <div
                    key={i}
                    className={
                        "flex w-full flex-col gap-1 rounded-lg border-[1px] border-text bg-bg px-2 py-1 text-text"
                    }
                    style={{ boxShadow: `0px 3px 0px 0px ${c.color}` }}
                >
                    <div className="flex justify-between">
                        <p className="text-xl">{c.name}</p>
                        <p className="flex items-center text-base">
                            {c.startTime} - {c.endTime}
                        </p>
                    </div>
                    <div className="flex justify-between font-light">
                        <p>{c.location}</p>
                        <button
                            onClick={() => deleteSlot(c.id, day)}
                            className="rounded-md border-[1px] border-text bg-bg px-1"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
