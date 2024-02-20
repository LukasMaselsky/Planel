import { FieldError } from "react-hook-form";

interface Props {
    error:
        | FieldError
        | undefined
        | Partial<{ type: string | number; message: string }>;
}

export default function AddError({ error }: Props) {
    return (
        <div className="h-5 w-full">
            {error && <p className="text-sm text-red-500">{error?.message}</p>}
        </div>
    );
}
