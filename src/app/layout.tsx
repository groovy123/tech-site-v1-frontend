import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./_components/theme-provider";
import { ToggleThemeButton } from "./_components/theme-button";
import { GithubButton } from "./_components/github-button";
import { NaviList } from "./_components/navi-list";

const notSansJp = Noto_Sans_JP({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IT Tech Site",
  description: "このサイトはIT情報のまとめです",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${notSansJp.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>

          <div className="isolate">

            <div>
              { /** Header */}
              <div className="fixed inset-x-0 top-0 z-10 border-b border-gray-950/5 dark:border-white/10">

                <div className="">
                  <div className="flex h-14 items-center justify-between gap-8 px-4">

                    { /** Logo */}
                    <div className="flex items-center gap-4">
                      <a className="shrink-0" aria-label="Home" href="/">
                        <svg viewBox="0 0 167 21" fill="none" className="h-5 text-black dark:text-white">
                          <path className="fill-sky-400" d="M17.183 0C12.6 0 9.737 2.291 8.59 6.873c1.719-2.29 3.723-3.15 6.014-2.577 1.307.326 2.242 1.274 3.275 2.324 1.685 1.71 3.635 3.689 7.894 3.689 4.582 0 7.445-2.291 8.591-6.872-1.718 2.29-3.723 3.15-6.013 2.576-1.308-.326-2.243-1.274-3.276-2.324C23.39 1.98 21.44 0 17.183 0ZM8.59 10.309C4.01 10.309 1.145 12.6 0 17.182c1.718-2.291 3.723-3.15 6.013-2.577 1.308.326 2.243 1.274 3.276 2.324 1.685 1.71 3.635 3.689 7.894 3.689 4.582 0 7.445-2.29 8.59-6.872-1.718 2.29-3.722 3.15-6.013 2.577-1.307-.327-2.242-1.276-3.276-2.325-1.684-1.71-3.634-3.689-7.893-3.689Z"></path>
                          <path fill="currentColor" d="M51.547 8.688h-3v5.803c0 1.548 1.016 1.524 3 1.427v2.346c-4.015.483-5.611-.629-5.611-3.773V8.688H43.71V6.172h2.225V2.925l2.612-.774v4.021h2.998v2.516Zm11.43-2.516h2.61v12.092h-2.61v-1.741c-.92 1.28-2.346 2.055-4.233 2.055-3.288 0-6.021-2.78-6.021-6.36 0-3.603 2.733-6.36 6.021-6.36 1.886 0 3.313.774 4.233 2.032V6.172Zm-3.821 9.915c2.176 0 3.82-1.62 3.82-3.87 0-2.248-1.644-3.868-3.82-3.868-2.177 0-3.821 1.62-3.821 3.869s1.644 3.87 3.82 3.87ZM69.94 4.36a1.687 1.687 0 0 1-1.668-1.669c.002-.443.179-.868.491-1.18a1.662 1.662 0 0 1 2.354 0c.312.312.49.737.491 1.18 0 .895-.75 1.669-1.668 1.669Zm-1.306 13.905V6.172h2.612v12.092h-2.612Zm5.635 0V.609h2.611v17.654H74.27ZM93.834 6.172h2.757l-3.797 12.092h-2.563l-2.516-8.15-2.539 8.15h-2.563L78.816 6.172h2.757l2.346 8.343 2.54-8.343h2.49l2.514 8.343 2.37-8.343ZM99.83 4.36c-.92 0-1.669-.774-1.669-1.669.002-.443.18-.868.492-1.18a1.661 1.661 0 0 1 2.354 0c.313.312.49.737.492 1.18 0 .895-.75 1.669-1.669 1.669Zm-1.306 13.905V6.172h2.612v12.092h-2.612ZM110.52 5.858c2.708 0 4.643 1.838 4.643 4.982v7.423h-2.612v-7.158c0-1.838-1.064-2.804-2.708-2.804-1.717 0-3.071 1.015-3.071 3.482v6.48h-2.612V6.174h2.612V7.72c.798-1.257 2.103-1.862 3.748-1.862Zm17.024-4.522h2.612v16.927h-2.612v-1.741c-.918 1.282-2.345 2.055-4.231 2.055-3.289 0-6.022-2.78-6.022-6.36 0-3.603 2.733-6.36 6.022-6.36 1.886 0 3.313.774 4.231 2.032V1.336Zm-3.821 14.751c2.177 0 3.821-1.62 3.821-3.87 0-2.248-1.644-3.868-3.821-3.868-2.176 0-3.82 1.62-3.82 3.869s1.644 3.87 3.82 3.87Zm15.187 2.49c-3.651 0-6.384-2.78-6.384-6.36 0-3.602 2.733-6.359 6.384-6.359 2.37 0 4.426 1.233 5.393 3.12l-2.249 1.306c-.532-1.137-1.717-1.863-3.168-1.863-2.128 0-3.748 1.62-3.748 3.797 0 2.176 1.62 3.797 3.748 3.797 1.451 0 2.636-.75 3.216-1.863l2.249 1.282c-1.015 1.91-3.071 3.144-5.441 3.144Zm9.746-9.068c0 2.201 6.505.87 6.505 5.345 0 2.419-2.104 3.724-4.716 3.724-2.418 0-4.159-1.089-4.933-2.83l2.249-1.305c.387 1.088 1.355 1.74 2.684 1.74 1.161 0 2.056-.386 2.056-1.354 0-2.151-6.505-.942-6.505-5.27 0-2.274 1.959-3.701 4.425-3.701 1.983 0 3.628.92 4.474 2.515l-2.2 1.233c-.436-.943-1.283-1.378-2.274-1.378-.943 0-1.765.41-1.765 1.281Zm11.148 0c0 2.201 6.505.87 6.505 5.345 0 2.419-2.104 3.724-4.716 3.724-2.418 0-4.158-1.089-4.933-2.83l2.249-1.305c.387 1.088 1.354 1.74 2.684 1.74 1.161 0 2.056-.386 2.056-1.354 0-2.151-6.505-.942-6.505-5.27 0-2.274 1.959-3.701 4.426-3.701 1.982 0 3.627.92 4.473 2.515l-2.2 1.233c-.435-.943-1.282-1.378-2.273-1.378-.944 0-1.766.41-1.766 1.281Z"></path>
                        </svg>
                      </a>
                    </div>

                    { /** About/Contract */}
                    <div className="flex items-center gap-6">
                      <button type="button" className="inline-flex items-center gap-1 rounded-full bg-gray-950/2 px-2 py-1 inset-ring inset-ring-gray-950/8 dark:bg-white/5 dark:inset-ring-white/2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="-ml-0.5 size-4 fill-gray-600 dark:fill-gray-500">
                          <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd"></path>
                        </svg>
                        <kbd className="hidden font-sans text-xs/4 text-gray-500 dark:text-gray-400">Ctrl&nbsp;K</kbd>
                      </button>
                      <a className="text-sm/6 text-gray-950 dark:text-white" href="/contact">お問い合わせ</a>
                      <a className="text-sm/6 text-gray-950 dark:text-white" href="/about">このサイトについて</a>
                      <a className="text-sm/6 text-gray-950 dark:text-white" href="/policy">ぽりしぃ</a>

                      <div className="flex items-center border-l border-gray-950/5 dark:border-white/10 pl-6">
                        <ToggleThemeButton />
                        <GithubButton />
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              { /** Main */}
              <div className="grid min-h-dvh grid-rows-[1fr_1px_auto_1px_auto] grid-cols-[var(--container-2xs)_2.5rem_minmax(0,1fr)_2.5rem] pt-14.25">

                { /** Side bar */}
                <div className="relative col-start-1 row-start-1 row-span-full">
                  <div className="absolute inset-0">
                    <div className="sticky top-14.25 bottom-0 left-0 h-full max-h-[calc(100dvh-(var(--spacing)*14.25))] w-2xs p-6 overflow-y-auto">
                      <div>
                        <nav className="flex flex-col gap-8">
                          <div className="flex flex-col gap-3">
                            <NaviList />
                          </div>
                        </nav>
                      </div>

                    </div>
                  </div>
                </div>

                { /** main */}
                <div className="relative col-start-3 row-start-1 grid-cols-subgrid">
                  {children}
                </div>
              </div>



            </div>

          </div>


        </ThemeProvider>
      </body>
    </html>
  );
}
