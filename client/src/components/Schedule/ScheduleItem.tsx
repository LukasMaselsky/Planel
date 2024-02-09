import { Schedule } from "./Schedule";

export default function ScheduleItem({ day, alias, classes }: Schedule) {
    return (
        <div className="flex h-full w-full flex-col">
            {classes?.map((c, i: number) => (
                <div
                    key={i}
                    className={"w-full rounded-lg bg-red-500 px-2 py-1"}
                >
                    <div>{c.name}</div>
                </div>
            ))}
        </div>
    );
}
