import { Grades } from "./Grades";

export default function GradeItem(props: Grades) {
    const passing = `${props.passingPercentage}%`;
    const rest = `${props.gradeAsPercentage - props.passingPercentage < props.passingPercentage ? 0 : props.gradeAsPercentage - props.passingPercentage}%`;

    return (
        <div className="flex w-full flex-col gap-2">
            <div
                className={
                    "flex w-full flex-col gap-2 rounded-lg border-[1px] border-text bg-bg px-2 py-1 text-text"
                }
                style={{ boxShadow: `0px 3px 0px 0px ${props.color}` }}
                //style={{ borderColor: props.color }}
            >
                <div className="flex justify-between">
                    <p className="text-xl">{props.name}</p>
                    <p className="flex items-center text-base">{props.grade}</p>
                </div>
                <div className="flex justify-between font-light">
                    <div className="flex h-3 w-full overflow-hidden rounded-md border-[1px] border-black">
                        <div
                            className="bg-red-500"
                            style={{ width: passing }}
                        ></div>
                        <div
                            className="bg-green-500"
                            style={{ width: rest }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
