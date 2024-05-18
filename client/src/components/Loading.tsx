import { BarLoader } from "react-spinners";
import { getPrimaryColor } from "../utils/getTheme";

export default function Loading() {
    const color = getPrimaryColor(700);

    return (
        <div className="flex h-full w-full items-center justify-center overflow-hidden px-4 py-2">
            <BarLoader color={color} loading={true} width={"50%"} height={5} />
        </div>
    );
}
