import { FieldErrors } from "react-hook-form";
import { Values } from "./AddSlot";

interface Props {
    errors: FieldErrors<Values>;
    name: keyof Values;
}

export default function AddSlotError({ errors, name }: Props) {
    return (
        <div className="h-5 w-full">
            {errors[name] && (
                <p className="text-sm text-red-500">{errors[name]?.message}</p>
            )}
        </div>
    );
}
