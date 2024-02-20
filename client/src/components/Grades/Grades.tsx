import { useState } from "react";
import { useQuery } from "react-query";
import GradeItem from "./GradeItem";
import AddGrade from "./AddGrade";

export interface Grades {
    name: string;
    color: string;
    grade: string;
    passingPercentage: number;
    gradeAsPercentage: number;
}

export default function Grades() {
    const [adding, setAdding] = useState(false);

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

    const addGrade = (data: Grades): boolean => {
        let grades: Grades[] = getGrades();
        const slot = grades.find((item) => item.name == data.name);

        if (slot) return false; // not valid

        const newGrades = [...grades, data];
        localStorage.setItem("grades", JSON.stringify(newGrades));
        refetch(); // manually call react query refresh
        return true;
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
                        <GradeItem key={i} {...item} />
                    ))}
                {adding && <AddGrade addGrade={addGrade} close={close} />}
            </div>
            <div className="flex w-full justify-center">
                <button onClick={() => setAdding(true)}>Add grade</button>
            </div>
        </div>
    );
}
