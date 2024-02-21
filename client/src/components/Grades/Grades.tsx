import { useState } from "react";
import { useQuery } from "react-query";
import GradeItem from "./GradeItem";
import UpdateGrade from "./UpdateGrade";
import { GradeValues } from "./UpdateGrade";

export interface Grades {
    name: string;
    color: string;
    grade: string;
    passingPercentage: number;
    gradeAsPercentage: number;
}

const baseDefaults = {
    name: "",
    color: "#B80000",
    grade: "",
    passingPercentage: 40,
    gradeAsPercentage: 80,
    gradeAsPercentageSlider: 80,
};

export default function Grades() {
    const [adding, setAdding] = useState(false);
    const [defaults, setDefaults] = useState<GradeValues>(baseDefaults);
    const [editing, setEditing] = useState(false);

    const close = () => {
        setAdding(false);
    };

    const getGrades = () => {
        let grades = localStorage.getItem("grades");
        if (grades) {
            return JSON.parse(grades);
        }
        return [];
    };

    const updateGrade = (data: Grades): boolean => {
        let grades: Grades[] = getGrades();
        const slot = grades.find((item) => item.name == data.name);

        if (slot && editing) {
            grades[grades.indexOf(slot)] = data;
            setEditing(false);
            localStorage.setItem("grades", JSON.stringify(grades));
        } else {
            if (slot) return false; // not valid

            const newGrades = [...grades, data];
            localStorage.setItem("grades", JSON.stringify(newGrades));
        }
        refetch(); // manually call react query refresh
        return true;
    };

    const deleteGrade = (name: string) => {
        let grades: Grades[] = getGrades();

        if (grades) {
            grades = grades.filter((grade) => grade.name != name);
        }

        localStorage.setItem("grades", JSON.stringify(grades));
        //! add delay/animation here
        setTimeout(function () {
            refetch();
        }, 100);
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryFn: getGrades,
        queryKey: ["grades"],
        staleTime: Infinity,
        cacheTime: 0,
    });

    if (isLoading) return <div>Loading</div>;

    if (error) return <div>Error</div>;

    //! weird box shadow not moving horizontally

    return (
        <div className="relative flex h-[400px] w-[300px] flex-col gap-2 rounded-lg border-[1px] border-black p-1">
            <div className="flex h-full w-full flex-col gap-2 overflow-y-auto pb-1">
                {data &&
                    data.map((item: Grades, i: number) => (
                        <GradeItem
                            key={i}
                            deleteGrade={deleteGrade}
                            props={item}
                            setAdding={setAdding}
                            setDefaults={setDefaults}
                            setEditing={setEditing}
                        />
                    ))}
                {adding && (
                    <UpdateGrade
                        defaultValues={defaults}
                        updateGrade={updateGrade}
                        close={close}
                        editing={editing}
                    />
                )}
            </div>
            <div className="flex w-full justify-center">
                <button
                    onClick={() => {
                        setEditing(false);
                        setDefaults(baseDefaults);
                        setAdding(true);
                    }}
                >
                    Add grade
                </button>
            </div>
        </div>
    );
}
