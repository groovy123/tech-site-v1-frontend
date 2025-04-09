"use client"

import useSWR from 'swr';
import { CategoryJson } from "../_domain/category";

type CategoryFetcherResponse = {
    data?: CategoryJson[],
    isLoading: boolean,
    isError: boolean,
};

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useAllCategory(): CategoryFetcherResponse {
    const { data, error, isLoading } = useSWR<CategoryJson[]>("http://localhost:8000/categories/", fetcher);
    return {
        data,
        isLoading,
        isError: error
    }
}