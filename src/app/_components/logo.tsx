function logo1() {
    return (
        <svg viewBox="0 -20 300 22" fill="none" className="h-5 text-black dark:text-white">
            <text className="font-bold text-2xl stroke-white fill-blue-500 stroke-2">いっとめも</text>
        </svg>
    );
}

function logo2() {
    // return (
    //     <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    //         <style>
    //         </style>
    //         <defs>
    //             <text id="text1">
    //                 SVGテキスト
    //             </text>
    //         </defs>
    //         <rect width="100%" height="100%" fill="#000"></rect>
    //         <use href="#text1" class="text1" x="50" y="100" fill="#fff" />
    //         <circle id="circle" cx="100" cy="70" r="100" fill="#fff"></circle>
    //     </svg>
    // );
}

export function PageLogo() {
    return logo1();
}