"use client"

import { Content, ContentJson, toContent } from "@/app/_domain/content";
import { useContent } from "@/app/_fetcher/content_fetcher";
import hljs, { HighlightOptions } from "highlight.js";
import { marked, Token, Tokens, walkTokens } from "marked";
import { useParams } from "next/navigation";
import React, { JSX, use, useState } from "react";
import 'highlight.js/styles/atom-one-dark.css';

// type Prop = {
//   params: Promise<any>;
//   searchParams: Promise<any>;
// }

type Params = {
  slug: string;
}

// async function fetchContent(param: Prop) {
//   const params = await param.params;
//   const response = await fetch("http://localhost:8000/contents/" + params.slug);
//   const data = (await response.json()) as ContentJson;
//   return new Content(data.id, data.category, data.text, data.created_at, data.update_at, data.update_no);
// }

function parse(json: ContentJson | undefined): string {
  if (json) {
    const content = toContent(json);
    if (content && content.text) {

      const work = parseToc(content.text);
      if (work) {
        return work;
      }
    }
  }
  return "<div>text is empty!<div>";
}

type HeadingValue = {
  level: number,
  slug: string,
  title: string,
};

function parseToc(content: string) {
  // 目次用の配列を定義
  let title: string = "";
  const toc: string[] = [];

  // カスタムレンダラーを作成
  const renderer = new marked.Renderer();

  // 見出し要素を処理する関数を定義
  renderer.heading = ({ text, depth }: Tokens.Heading) => {
    const slug = text.toLowerCase().replace(/\s+/g, "-").replace(/[!$%^&@#*()+|~=`{}[\]:";'<>?,./]/g, "");
    const header = `<h${depth} id="${slug}">${text}</h${depth}>\n`;
    if (depth === 1 || depth === 2) {
      title = `
      <h1 class="font-extrabold">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">@${text}</span>
      </h1>`;
      return "";
    }
    toc.push(`<li><a href="#${slug}">${text}</a></li>\n`);
    return header;
  };

  // code部分
  renderer.code = ({ text, lang, escaped }: Tokens.Code) => {
    const options: HighlightOptions = { language: lang ?? "" };
    const html = lang === "mermaid" ? text : hljs.highlight(text, options).value;
    return `<pre><code class="${lang}">${html}</code></pre>`;
  }

  // marked.jsのオプションを設定
  marked.setOptions({ renderer: renderer });

  const htmlContent = marked.parse(content);
  if (typeof htmlContent === "string") {
    // TOCを表示
    return `${title}\n<ul>${toc.join("\n")}</ul>\n` + htmlContent;
  }
  return "";
}

export default function ContentPage() {
  const params = useParams<Params>();

  // Content取得
  const { data, isLoading, isError } = useContent({ id: params.slug });

  if (isLoading) return "loading...";

  // MarkdownをHTMLに変換
  const htmlContent = parse(data);

  return (

    <div className="mx-auto grid w-full gap-10 max-w-5xl grid-cols-[minmax(0,1fr)_var(--container-2xs)]">

      { /** col0 */}
      <div className="px-4 pt-10 pb-24 sm:px-6 xl:pr-0">
        <div className="max-w-none prose dark:prose-invert p-8 prose-headings:underline" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
      </div>

      { /** col1 */}
      <div>
        <div className="sticky top-14 max-h-[calc(100svh-3.5rem)] overflow-x-hidden px-6 pt-10 pb-24">
          <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">On this page</h3>
          <ul className="flex flex-col gap-2 border-l dark:border-[color-mix(in_oklab,_var(--color-gray-950),white_20%)] border-[color-mix(in_oklab,_var(--color-gray-950),white_90%)]">
            <li className="-ml-px flex flex-col items-start gap-2">
              <a className="inline-block border-l border-transparent text-base/8 text-gray-600 hover:border-gray-950/25 hover:text-gray-950 sm:text-sm/6 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white aria-[current]:border-gray-950 aria-[current]:font-semibold aria-[current]:text-gray-950 dark:aria-[current]:border-white dark:aria-[current]:text-white pl-5 sm:pl-4" type="button" data-headlessui-state="" href="#overview" aria-current="location">Overview</a>
              <ul className="flex flex-col gap-2 border-l dark:border-[color-mix(in_oklab,_var(--color-gray-950),white_20%)] border-transparent">
                <li className="-ml-px flex flex-col items-start gap-2">
                  <a className="inline-block border-l border-transparent text-base/8 text-gray-600 hover:border-gray-950/25 hover:text-gray-950 sm:text-sm/6 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white aria-[current]:border-gray-950 aria-[current]:font-semibold aria-[current]:text-gray-950 dark:aria-[current]:border-white dark:aria-[current]:text-white pl-8 sm:pl-7.5" type="button" data-headlessui-state="" href="#why-not-just-use-inline-styles">Why not just use inline styles?</a>
                </li>
              </ul>
            </li>
            <li className="-ml-px flex flex-col items-start gap-2">
              <a className="inline-block border-l border-transparent text-base/8 text-gray-600 hover:border-gray-950/25 hover:text-gray-950 sm:text-sm/6 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white aria-[current]:border-gray-950 aria-[current]:font-semibold aria-[current]:text-gray-950 dark:aria-[current]:border-white dark:aria-[current]:text-white pl-5 sm:pl-4" type="button" data-headlessui-state="" href="#thinking-in-utility-classes">Thinking in utility classes</a>
              <ul className="flex flex-col gap-2 border-l dark:border-[color-mix(in_oklab,_var(--color-gray-950),white_20%)] border-transparent">
                <li className="-ml-px flex flex-col items-start gap-2">
                  <a className="inline-block border-l border-transparent text-base/8 text-gray-600 hover:border-gray-950/25 hover:text-gray-950 sm:text-sm/6 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white aria-[current]:border-gray-950 aria-[current]:font-semibold aria-[current]:text-gray-950 dark:aria-[current]:border-white dark:aria-[current]:text-white pl-8 sm:pl-7.5" type="button" data-headlessui-state="" href="#styling-hover-and-focus-states">Styling hover and focus states</a>
                </li>
                <li className="-ml-px flex flex-col items-start gap-2">
                  <a className="inline-block border-l border-transparent text-base/8 text-gray-600 hover:border-gray-950/25 hover:text-gray-950 sm:text-sm/6 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white aria-[current]:border-gray-950 aria-[current]:font-semibold aria-[current]:text-gray-950 dark:aria-[current]:border-white dark:aria-[current]:text-white pl-8 sm:pl-7.5" type="button" data-headlessui-state="" href="#media-queries-and-breakpoints">Media queries and breakpoints</a>
                </li>
                <li className="-ml-px flex flex-col items-start gap-2">
                  <a className="inline-block border-l border-transparent text-base/8 text-gray-600 hover:border-gray-950/25 hover:text-gray-950 sm:text-sm/6 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white aria-[current]:border-gray-950 aria-[current]:font-semibold aria-[current]:text-gray-950 dark:aria-[current]:border-white dark:aria-[current]:text-white pl-8 sm:pl-7.5" type="button" data-headlessui-state="" href="#targeting-dark-mode">Targeting dark mode</a>
                </li>
                <li className="-ml-px flex flex-col items-start gap-2">
                  <a className="inline-block border-l border-transparent text-base/8 text-gray-600 hover:border-gray-950/25 hover:text-gray-950 sm:text-sm/6 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white aria-[current]:border-gray-950 aria-[current]:font-semibold aria-[current]:text-gray-950 dark:aria-[current]:border-white dark:aria-[current]:text-white pl-8 sm:pl-7.5" type="button" data-headlessui-state="" href="#using-class-composition">Using class composition</a>
                </li>
                <li className="-ml-px flex flex-col items-start gap-2">
                  <a className="inline-block border-l border-transparent text-base/8 text-gray-600 hover:border-gray-950/25 hover:text-gray-950 sm:text-sm/6 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white aria-[current]:border-gray-950 aria-[current]:font-semibold aria-[current]:text-gray-950 dark:aria-[current]:border-white dark:aria-[current]:text-white pl-8 sm:pl-7.5" type="button" data-headlessui-state="" href="#using-arbitrary-values">Using arbitrary values</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}
