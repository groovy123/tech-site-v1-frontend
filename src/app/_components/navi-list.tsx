import { FC } from "react";
import styles from "../_styles/navi-list.module.css";
import clsx from "clsx";


type NaviListProps = {
    title: string;
    list: string[];
};

export function NaviList({
    title,
    list,
}: NaviListProps) {
    return (
        <>
            <h3 className="font-medium text-sm/6 tracking-widest text-gray-500 dark:text-gray-400">{title}</h3>
            <ul className={clsx("flex flex-col gap-2 border-l border-gray-800", styles)}>
                {list.map((item, index) => (
                    <li key={index} className="flex flex-col items-start gap-2 text-gray-300">
                        <a href="#" className="pl-4">{item}</a>
                    </li>
                ))}
            </ul>
        </>
    );
}