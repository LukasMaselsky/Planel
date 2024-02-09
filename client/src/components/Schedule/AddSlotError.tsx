import { FieldErrors, FieldValues } from "react-hook-form";

interface Props {
    errors: FieldErrors<FieldValues>;
    msg: string;
    type: string;
    name: string;
}

export default function AddSlotError({ errors, msg, type, name }: Props) {
    return (
        <>
            {errors?.[name]?.type === type && (
                <p className="text-red-500">{msg}</p>
            )}
        </>
    );
}
