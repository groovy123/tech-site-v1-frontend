import Image from "next/image";
import { ToggleThemeButton } from "./_components/theme-button";
import { GithubButton } from "./_components/github-button";

export default function Home() {
  return (
    <>
      { /** Header */}
      <div className="sticky top-0 z-40 w-full">

        <div className="max-w-screen mx-auto">
          <div className="py-4 px-8 border-b dark:border-slate-300/10">

            <div className="flex items-center">
              <a className="w-auto" href="/">
                <span>Tech site</span>
              </a>

              <div className="flex items-center ml-auto">
                <nav className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <ul className="flex space-x-8">
                    <li>
                      <a className="hover:text-sky-500 dark:hover:text-sky-400" href="/contact">お問い合わせ</a>
                    </li>
                    <li>
                      <a className="hover:text-sky-500 dark:hover:text-sky-400" href="/about">このサイトについて</a>
                    </li>
                    <li>
                      <a className="hover:text-sky-500 dark:hover:text-sky-400" href="/policy"> </a>
                    </li>
                  </ul>
                </nav>

                <div className="flex items-center border-l border-slate-200 ml-6 pl-6 dark:border-slate-800">
                  <ToggleThemeButton />
                  <GithubButton />
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      { /** Sidebar */}
      <div>
        <div className="max-w-4xl mx-auto px-4">
          <div className="hidden lg:block fixed z-20 inset-0 top-[3.8125rem] left-[max(0px, calc(50%-45rem))] right-auto w-[19rem] pb-10 pl-8 pr-6 overflow-auto">
          <h5 className="mb-3 mt-3 font-semibold text-slate-200">Python</h5>
                <ul className="space-y-2 border-l border-slate-800">
                    <li><a className="border-l pl-4">01.基本</a></li>
                    <li>01.基本</li>
                    <li>01.基本</li>
                    <li>01.基本</li>
                    <li>01.基本</li>
                    <li>01.基本</li>
                    <li>01.基本</li>
                    <li>01.基本</li>
                    <li>01.基本</li>
                    <li>01.基本</li>
                    <li>01.基本</li>
                    <li>01.基本</li>
                    <li>01.基本</li>
                </ul>
          </div>
        </div>
      </div>

    </>
  );
}
