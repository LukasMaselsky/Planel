import { BarLoader } from "react-spinners";
import { getTheme } from "../utils/getTheme";

export default function Loading() {
    const secondary = getTheme("secondary");

    return (
        <div className="flex h-full w-full items-center justify-center overflow-hidden px-4 py-2">
            <BarLoader
                color={secondary}
                loading={true}
                width={"50%"}
                height={5}
            />
        </div>
    );
}
