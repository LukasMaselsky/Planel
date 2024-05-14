import { useState, useContext } from "react";
import { useQuery } from "react-query";
import GradeItem from "./GradeItem";
import UpdateGrade from "./UpdateGrade";
import { GradeValues } from "./UpdateGrade";
import { getItem } from "../../utils/localStorage";
import { ClassesContext } from "../../context/classesContext";
import Empty from "../Empty";
import OrganiseWrapper from "../OrganiseWrapper";
import Loading from "../Loading";

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

type Props = {
    width: string;
    height: string;
};

export default function Grades({ width, height }: Props) {
    const [adding, setAdding] = useState(false);
    const [defaults, setDefaults] = useState<GradeValues>(baseDefaults);
    const [editing, setEditing] = useState(false);
    const classes = useContext(ClassesContext);

    const close = () => {
        setAdding(false);
    };

    const updateGrade = (data: Grades): boolean => {
        let grades: Grades[] = getItem("grades");
        const slot = grades.find((item) => item.name == data.name);

        if (slot && editing) {
            grades[grades.indexOf(slot)] = data;
            setEditing(false);
            localStorage.setItem("grades", JSON.stringify(grades));
        } else {
            if (slot) return false; // not valid

            if (classes) {
                classes.addClass(data.name);
            }
            const newGrades = [...grades, data];
            localStorage.setItem("grades", JSON.stringify(newGrades));
        }
        refetch(); // manually call react query refresh
        return true;
    };

    const deleteGrade = (name: string) => {
        let grades: Grades[] = getItem("grades");

        if (grades) {
            grades = grades.filter((grade) => grade.name != name);
        }

        if (classes) {
            classes.removeClass(name);
        }
        localStorage.setItem("grades", JSON.stringify(grades));
        //! add delay/animation here
        setTimeout(function () {
            refetch();
        }, 100);
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryFn: () => getItem("grades"),
        queryKey: ["grades"],
        staleTime: Infinity,
        cacheTime: 0,
    });

    if (isLoading)
        return (
            <OrganiseWrapper width={width} height={height}>
                <Loading />
            </OrganiseWrapper>
        );

    if (error) return <div>Error</div>;

    //! weird box shadow not moving horizontally

    return (
        <OrganiseWrapper width={width} height={height}>
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
                {data && data.length == 0 ? (
                    <Empty component={"grades"} />
                ) : null}
            </div>
            <div className="flex w-full justify-center text-text">
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
        </OrganiseWrapper>
    );
}
