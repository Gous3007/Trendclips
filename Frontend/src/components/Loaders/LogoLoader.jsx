const LogoLoader = () => {
    return (

        <div className="fixed inset-0 bg-white/70 backdrop-blur-md flex items-center justify-center z-9999">

            <div className="relative w-[90%] max-w-[340px] flex flex-col items-center justify-center">

                <div className="relative z-10 flex items-center justify-center gap-3 mb-6 drop-shadow-sm">

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-tighter">
                        TrendClips
                    </h1>
                </div>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 400 120"
                    className="absolute left-0 bottom-[-50px] w-full overflow-visible"
                >
                    <path
                        id="curveTrack"
                        d="M20 60 Q200 120 380 60"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeOpacity="0.1"
                        strokeLinecap="round"
                    />
                    <g>
                        <circle r="6" fill="#000000" className="drop-shadow-lg">

                            <animateMotion
                                dur="1.6s"
                                repeatCount="indefinite"
                                rotate="auto"
                                calcMode="spline"
                                keyTimes="0;1"
                                keySplines="0.45 0 0.55 1"
                            >

                                <mpath href="#curveTrack" xlinkHref="#curveTrack" />
                            </animateMotion>
                        </circle>
                    </g>
                </svg>

            </div>
        </div>
    );
};

export default LogoLoader;