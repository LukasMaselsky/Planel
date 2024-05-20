import { ReactNode, createContext, useEffect, useState } from "react";
import otter1 from "../assets/otter1.png";
import otter2 from "../assets/otter2.png";
import otter3 from "../assets/otter3.png";
import otter4 from "../assets/otter4.png";
import otter5 from "../assets/otter5.png";
import otter6 from "../assets/otter6.png";
import otter7 from "../assets/otter7.png";

type Props = {
    children: ReactNode;
};

type OtterContextType = {
    otters: string[];
    shuffledOtters: string[];
};

export const OtterContext = createContext<OtterContextType | null>(null);

const shuffleArray = (array: string[]) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};

const otterImages = [otter1, otter2, otter3, otter4, otter5, otter6, otter7];
const emptyOtterImages = [otter1, otter2, otter3]; // used for empty screen

export const OtterContextProvider = ({ children }: Props) => {
    const [otters, setOtters] = useState<string[]>([]);
    const [shuffledOtters, setShuffledOtters] = useState<string[]>([]);

    useEffect(() => {
        setOtters(otterImages);
        setShuffledOtters(shuffleArray(emptyOtterImages));
    }, []);

    return (
        <OtterContext.Provider
            value={{
                otters: otters,
                shuffledOtters: shuffledOtters,
            }}
        >
            {children}
        </OtterContext.Provider>
    );
};
