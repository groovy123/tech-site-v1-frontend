"use client"

import React, { FC, JSX, useId } from "react";
import styles from "../_styles/navi-list.module.css";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useAllCategory } from "../_fetcher/cateory_fetcher";
import { Category, toCategoryList } from "../_domain/category";
import Link from "next/link";
import ErrorBoundary from "./ErrorBoundary";

type NaviLinkProps = {
    children: string,
    href: string,
    isActiv: boolean,
}

const NaviLink = (props: NaviLinkProps) => {
    const activeStyle = props.isActiv ? "font-semibold border-white text-white" : "";
    return (
        <Link
            href={props.href}
            className={`
                inline-block 
                border-l 
                pl-5
                border-transparent 
                text-base/8 
                text-gray-600 
                hover:border-gray-950/25 
                hover:text-gray-950 sm:text-sm/6 
                dark:text-gray-300 
                dark:hover:border-white/25 
                dark:hover:text-white
                ${activeStyle}
            `}>
                {props.children}
        </Link>
    )
};

function getCategoryName(val: string) {
    const start = val.indexOf("/") + 1;
    return val.substring(start, val.length - 3);
}

export function NaviList() {
    const id = useId();
    const pathname = usePathname();

    const { data, isLoading, isError } = useAllCategory();

    if (isLoading) return "isLoading...";

    // Json to Map<stirng, Category[]>
    const categories = data ? toCategoryList(data) : new Map();

    const createLi = (list: Category[]): JSX.Element[] => {
        return list.map((category: Category) => {
            // remove prefix and suffix
            const href = "/content/" + category.id;
            return <li key={category.id} className="-ml-px flex flex-col items-start gap-2">
                <NaviLink children={getCategoryName(category.category)} href={href} isActiv={href === pathname} />
            </li>
        })
    };

    const createUl = (map: Map<string, Category[]>): JSX.Element[] => {
        // return listItems;
        let index = 0;
        return [...categories.entries()].map(([key , value]) => {
            return <React.Fragment key={`${id}-${index++}`}>
                <h3 className="font-medium text-sm/6 tracking-widest text-gray-500 dark:text-gray-400">{key}</h3>
                <ul className="flex flex-col gap-2 border-l dark:border-[color-mix(in_oklab,_var(--color-gray-950),white_20%)] border-[color-mix(in_oklab,_var(--color-gray-950),white_90%)]">
                    {createLi(value)}
                </ul>
            </React.Fragment>
        });
    }

    return (
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
            { createUl(categories) }
        </ErrorBoundary>
    );
}