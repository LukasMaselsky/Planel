import otter1 from "../assets/otter1.png";
import otter2 from "../assets/otter2.png";
import otter3 from "../assets/otter3.png";

type Props = {
    width: string;
    index?: number;
};

export const otterImages = [otter1, otter2, otter3];

export const randomImage = () => {
    return otterImages[Math.floor(Math.random() * 3)];
};

export default function OtterImage({ width, index }: Props) {
    return (
        <img
            src={index != undefined ? otterImages[index] : randomImage()}
            style={{ width: width }}
        ></img>
    );
}
