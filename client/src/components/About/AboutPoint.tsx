import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

type Props = {
    children: ReactNode;
    index: number;
};

export default function AboutPoint({ children, index }: Props) {
    return (
        <motion.div
            className="flex gap-x-2 leading-5"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <FontAwesomeIcon
                className="text-primary-600 inline pt-[1px]"
                icon={faAnglesRight}
            />
            {children}
        </motion.div>
    );
}
