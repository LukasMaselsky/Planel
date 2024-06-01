import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

type Props = {
    width: number;
    height: number;
    dark: boolean;
};

type Coordinate = {
    x: number;
    y: number;
};

export default function AboutActivity({ width, height, dark }: Props) {
    const coordinates: Coordinate[] = [];
    coordinates.push({ x: 0, y: height * 0.9 });
    coordinates.push({ x: width * 0.2, y: height * 0.5 });
    coordinates.push({ x: width * 0.4, y: height * 0.75 });
    coordinates.push({ x: width * 0.6, y: height * 0.25 });
    coordinates.push({ x: width * 0.8, y: height * 0.4 });
    coordinates.push({ x: width, y: height * 0.1 });

    let linePath = `M${coordinates[0].x},${coordinates[0].y}`;
    for (let i = 1; i < coordinates.length; i++) {
        linePath = linePath + `L${coordinates[i].x},${coordinates[i].y}`;
    }

    return (
        <div
            className={
                "flex h-full w-full items-center justify-center overflow-hidden"
            }
        >
            <div className="flex h-full w-full items-center justify-center">
                <svg
                    width={width}
                    height={height}
                    viewBox={`0,0,${width},${height}`}
                    className="h-auto max-w-full"
                >
                    <motion.path
                        fill="none"
                        strokeWidth={3}
                        d={linePath}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1 }}
                        className="stroke fill-none stroke-primary"
                    ></motion.path>
                    {coordinates.map((coord, i) => {
                        if (i != 0 && i != coordinates.length - 1) {
                            return (
                                <circle
                                    key={i}
                                    cx={coord.x}
                                    cy={coord.y}
                                    r="7"
                                    className={twMerge(
                                        dark
                                            ? "fill-primary-200"
                                            : "fill-primary-800",
                                    )}
                                />
                            );
                        }
                    })}
                </svg>
            </div>
        </div>
    );
}
