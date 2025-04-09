"use client"

import useSWR from 'swr';
import { ContentJson } from "../_domain/content";

type ContentFetcherRequest = {
    id: string
}

type ContentFetcherResponse = {
    data?: ContentJson,
    isLoading: boolean,
    isError: boolean,
}

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useContent(request: ContentFetcherRequest): ContentFetcherResponse {
    const { data, error, isLoading } = useSWR<ContentJson>("http://localhost:8000/contents/" + request.id, fetcher);
    return {
        data,
        isLoading,
        isError: error
    }
}

export async function getContent(request: ContentFetcherRequest): Promise<ContentFetcherResponse> {
    try {
        const response = await fetch(`http://localhost:8000/contents/${request.id}`);
        if (!response.ok) {
            throw new Error(`fetch error. response status is ${response.status}`);
        }
        const json = await response.json();
        return {
            data: json as ContentJson,
            isLoading: false,
            isError: false,
        }
    } catch(err) {
        return {
            isLoading: false,
            isError: true,
        }
    }
}