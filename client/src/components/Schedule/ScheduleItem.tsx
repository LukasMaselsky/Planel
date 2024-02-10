import { Schedule } from "./Schedule";

export default function ScheduleItem({ classes }: Schedule) {
    return (
        <div className="flex h-full w-full flex-col gap-2 overflow-y-auto">
            {classes?.map((c, i: number) => (
                <div
                    key={i}
                    className={
                        "flex w-full flex-col gap-1 rounded-lg bg-red-500 px-2 py-1"
                    }
                >
                    <div className="flex justify-between">
                        <p className="text-xl">{c.name}</p>
                        <p className="flex items-center text-base">
                            {c.startTime} - {c.endTime}
                        </p>
                    </div>
                    <div className="font-light">{c.location}</div>
                </div>
            ))}
        </div>
    );
}
