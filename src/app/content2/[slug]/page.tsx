"use client"

import { useContent } from "@/app/_fetcher/content_fetcher";
import { useParams } from "next/navigation";
import React, { JSX, useMemo, useState } from "react";
import Markdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SyntaxHighlighter from "react-syntax-highlighter";
import { TableOfContents } from "@/app/_components/TableOfContents";

type Params = {
    slug: string;
}

// interface CodeBlockProps {
//     inline: boolean;
//     className: string;
//     children: React.ReactNode;
//   }

// const CodeBlock: React.FC<CodeBlockProps> = ({
//     inline,
//     className,
//     children,
//   }) => {
//     const match = /language-(\w+)/.exec(className || '');
//     return !inline && match ? (
//       <SyntaxHighlighter
//         style={dark}
//         language={match[1]}
//         PreTag="div"
//       >
//         {String(children).replace(/\n$/, '')}
//       </SyntaxHighlighter>
//     ) : (
//       <code className={className}>{children}</code>
//     );
//   };

// const code = {
//     code(props) {
//       const {children, className, node, ...rest} = props
//       const match = /language-(\w+)/.exec(className || '')
//       return match ? (
//         <SyntaxHighlighter
//           {...rest}
//           PreTag="div"
//           children={String(children).replace(/\n$/, '')}
//           language={match[1]}
//           style={github}
//         />
//       ) : (
//         <code {...rest} className={className}>
//           {children}
//         </code>
//       )
//     }
// };


export default function ContentPage() {
    const params = useParams<Params>();
    const [title, setTitle] = useState<JSX.Element>();

    // Content取得
    const { data, isLoading, isError } = useContent({ id: params.slug });

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
            const workTitle = (
                <h1 className="font-extrabold">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{"@" + children}</span>
                </h1>);
            setTitle(workTitle);
            return undefined;
        }
    }

    const markdownContent = useMemo(() => {
        console.log("useMemo is called.");
        if (data) {
            return <Markdown 
            remarkPlugins={[remarkGfm]}
            components={code}
            >
                {data?.text}
            </Markdown>
        }
    }, [data?.text]);

    if (isLoading) return "loading...";

    return (
        <div className="flex gap-4 mx-4 dark:bg-slate-800">
            <div className="max-w-full prose dark:prose-invert p-8">
                {title}
                {markdownContent}
            </div>
        </div>
    )
}