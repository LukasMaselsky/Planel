import { useContext, useEffect, useState } from "react";
import otter1 from "../assets/otter1.png";
import otter2 from "../assets/otter2.png";
import otter3 from "../assets/otter3.png";
import otter4 from "../assets/otter4.png";
import { OtterContext } from "../context/otterContext";

type Props = {
    width?: string;
    height?: string;
    index?: number;
    random: boolean;
};

export default function OtterImage({ width, height, index, random }: Props) {
    const [src, setSrc] = useState("");
    const ot = useContext(OtterContext);

    useEffect(() => {
        let src = "";
        if (ot) {
            if (random) {
                src = index ? ot.shuffledOtters[index] : ot.shuffledOtters[0];
            } else {
                src = index ? ot.otters[index] : ot.otters[0];
            }
        }
        setSrc(src);
    }, [ot]);

    return (
        <img
            src={src}
            className="object-contain"
            style={{
                width: width != undefined ? width : "auto",
                height: height != undefined ? height : "auto",
            }}
        ></img>
    );
}
