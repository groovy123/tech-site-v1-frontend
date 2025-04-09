"use client"

import { ContentJson } from "@/app/_domain/content";
import { getContent as fetchContent } from "@/app/_fetcher/content_fetcher";
import { useParams } from "next/navigation";
import { JSX, useActionState, useEffect, useRef, useState } from "react"
import Markdown, { Components } from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import remarkGfm from "remark-gfm";

type Params = {
    slug: string;
}

type ContentState = {
    title?: JSX.Element,
    markDown?: JSX.Element,
}

type ContentForm = {
    slug: string,
}

async function getContent(prevState: ContentState, formData: FormData): Promise<ContentState> {
    console.log(prevState);
    if (!prevState.markDown) {
        // Content取得
        const param = Object.fromEntries(formData.entries()) as ContentForm;
        const { data, isLoading, isError } = await fetchContent({ id: param.slug });
        if (data) {
            const newState = parseMarkdown(data);
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log(newState.title);
            return newState;
        }
    }
    return prevState;
}

function parseMarkdown(data: ContentJson): ContentState {
    const ret: ContentState = {};
    let count = 0
    const code: Components = {
        code: ({className, children, node, ref, ...rest}) => {
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                style={androidstudio}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            )
        },
        h1: ({ children }) => {
            if (!ret.title) {
                const workTitle = (
                    <h1 className="font-extrabold">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{"@" + children}</span>
                    </h1>);
                ret.title = workTitle;
                console.log(`${count++}:${children}`);    
            }
            return undefined;
        }
    }

    ret.markDown = <Markdown     
        remarkPlugins={[remarkGfm]}
        components={code}>
        {data?.text}
    </Markdown>

    return ret;
}

export default function COntentPage() {
    const params = useParams<Params>();
    const [state, action, isPending] = useActionState<ContentState, FormData>(getContent, {});
    const [title, setTitle] = useState<string>();

    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        formRef.current?.requestSubmit();
    }, []);

    return (
        <>
            <form action={action} ref={formRef}>
                <input type="text" name="slug" defaultValue={params.slug} />
                <button type="submit" disabled={isPending}>データ取得</button>
            </form>        
            <div className="flex gap-4 mx-4 dark:bg-slate-800">
            <div className="max-w-full prose dark:prose-invert p-8">
                {title}
                {state.markDown}
            </div>
        </div>
        </>
    )
}