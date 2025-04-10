"use client"

import { ContentJson, toContent } from "@/app/_domain/content";
import { useContent } from "@/app/_fetcher/content_fetcher";
import hljs, { HighlightOptions } from "highlight.js";
import 'highlight.js/styles/atom-one-dark.css';
import { marked, Tokens } from "marked";
import { useParams } from "next/navigation";
import React, { createElement, ReactElement } from "react";

type Params = {
  slug: string;
}

type ParseResult = {
  document: string;
  toc?: ReactElement[];
}

function parse(json: ContentJson | undefined): ParseResult {
  if (json) {
    const content = toContent(json);
    if (content && content.text) {
      const result = parseToc(content.text);
      if (result) {
        return result;
      }
    }
  }
  // empty!
  const empty = { 
    document: "<div>text is empty!<div>",
  };
  return empty;
}

function getLinkClasses() {
  const basic = "pl-5 inline-block border-l border-transparent text-base/8 text-gray-600 hover:border-gray-950/25 hover:text-gray-950";
  const dark = "dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white";
  const aria = "aria-[current]:border-gray-950 aria-[current]:font-semibold aria-[current]:text-gray-950";
  const ariaDark = "dark:aria-[current]:border-white dark:aria-[current]:text-white";
  return `${basic} ${dark} ${aria} ${ariaDark}`;
}

function parseToc(content: string): ParseResult | undefined {
  // 目次用の配列を定義
  let title: string = "";
  const toc: ReactElement[] = [];
  const linkClasses = getLinkClasses();

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

    // <li>要素作成
    const tocElement = createElement(
      "li", 
      { className: "-ml-px flex flex-col items-start gap-2", key: slug + toc.length },
      createElement(
        "a", 
        { className: linkClasses, href: `#${slug}`, onClick: handleClick }, 
        text),
    )

    toc.push(tocElement);
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
    const result = { 
      document: `${title}\n${htmlContent}`,
      toc: toc,
    };
    return result;
  }
  return;
}

function handleClick(e: React.MouseEvent) {
  // TODO どうやって変更するか
  // const target = e.target as HTMLLinkElement;
  // console.log(target.parentElement);
  // target.setAttribute("aria-current", "location");
}

export default function ContentPage() {
  const params = useParams<Params>();

  // Content取得
  const { data, isLoading, isError } = useContent({ id: params.slug });

  if (isLoading) return "loading...";

  // MarkdownをHTMLに変換
  const parseResult = parse(data);

  return (

    <div className="mx-auto grid w-full gap-10 max-w-5xl grid-cols-[minmax(0,1fr)_var(--container-2xs)] scroll-mt-60">

      { /** col0 */}
      <div className="px-4 pt-10 pb-24 sm:px-6 xl:pr-0">
        <div className="max-w-none prose dark:prose-invert p-8 prose-headings:underline" dangerouslySetInnerHTML={{ __html: parseResult.document }}></div>
      </div>

      { /** col1 */}
      <div>
        <div className="sticky top-14 max-h-[calc(100svh-3.5rem)] overflow-x-hidden px-6 pt-10 pb-24">
          <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">ページの内容</h3>
          <ul className="flex flex-col gap-2 border-l dark:border-[color-mix(in_oklab,_var(--color-gray-950),white_20%)] border-[color-mix(in_oklab,_var(--color-gray-950),white_90%)]">
            {parseResult.toc}
          </ul>
        </div>
      </div>

    </div>
  );
}
