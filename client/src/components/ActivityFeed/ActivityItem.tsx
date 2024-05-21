import { ActivityType } from "../../context/activityContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faBook, faCheck } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

interface Props extends ActivityType {
    index: number;
}

export default function ActivityItem({ name, date, type, index }: Props) {
    const icons = { assignment: faBook, todo: faCheck, time: faClock };

    return (
        <motion.div
            className="flex gap-x-2 rounded-lg border border-text p-2 leading-5 shadow-[0px_3px_0px_0px] shadow-primary-300"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <FontAwesomeIcon
                className="inline pt-[1px] text-2xl text-text"
                icon={icons[type]}
            />

            <p className="text-lg">
                Completed <b>{name}</b> on <b>{date}</b>
            </p>
        </motion.div>
    );
}
