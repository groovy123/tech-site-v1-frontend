import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./_components/theme-provider";
import { ToggleThemeButton } from "./_components/theme-button";
import { GithubButton } from "./_components/github-button";
import { NaviList } from "./_components/navi-list";
import { PageLogo } from "./_components/logo";

const notSansJp = Noto_Sans_JP({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "いっとめも",
  description: "このサイトはIT関連の私的なメモ帳（備忘録）です",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning className="dark scroll-smooth scroll-pt-16">
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
              <div className="fixed inset-x-0 top-0 z-10 border-b border-gray-950/5 dark:border-white/10 backdrop-blur">

                <div className="">
                  <div className="flex h-14 items-center justify-between gap-8 px-4">

                    { /** Logo */}
                    <div className="flex items-center gap-4">
                      <PageLogo />
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
              <div className="grid min-h-dvh grid-rows-[1fr_1px_auto_1px_auto] grid-cols-[12rem_2.5rem_minmax(0,1fr)_2.5rem] pt-14.25">

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
