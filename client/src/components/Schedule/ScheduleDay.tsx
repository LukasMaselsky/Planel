import Empty from "../Empty";
import { Schedule } from "./Schedule";
import { AnimatePresence } from "framer-motion";
import ScheduleItem from "./ScheduleItem";

interface Props {
    classes: Schedule["classes"];
    day: string;
    deleteSlot: (id: number, name: string, day: string) => void;
}

export default function ScheduleDay({ classes, day, deleteSlot }: Props) {
    return (
        <div className="flex h-full w-full flex-col gap-2 overflow-y-auto overflow-x-hidden pb-1">
            <AnimatePresence>
                {classes?.map((c) => (
                    <ScheduleItem
                        key={c.id}
                        color={c.color}
                        day={day}
                        location={c.location}
                        startTime={c.startTime}
                        endTime={c.endTime}
                        deleteSlot={deleteSlot}
                        id={c.id}
                        name={c.name}
                    />
                ))}
            </AnimatePresence>
            {classes?.length == 0 || !classes ? (
                <Empty component={"classes"} index={2} />
            ) : null}
        </div>
    );
}
