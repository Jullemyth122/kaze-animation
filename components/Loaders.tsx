import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useProgress,Loader } from "@react-three/drei";
import { useGlobal } from "@/functionality/GlobalFunctionality";

const tl = gsap.timeline();
const welcomeScreen = gsap.timeline({
  paused: true,
});

export const Loaders: React.FC = ({}) => {

    const { progress } = useProgress()

    const { setLoaderComplete } = useGlobal();

    // initializing loader
    const [time, setTime] = useState<number>(0);

    const handleLoaderComplete = () => {
        setLoaderComplete(true);
    };

    function startTimer() {
        let startTime = Date.now();
        let endTime = startTime + 10000;
        let id = setInterval(frame, 10);
        
        function frame() {
            let currentTime = Date.now();
            let elapsed = currentTime - startTime;
            let percentage = Math.floor(elapsed / 10000 * 100);
            if (currentTime >= endTime) {
                clearInterval(id);
                welcomeScreen.play()
                percentage = 100;
                setTime(percentage);
            } else {
                setTime(percentage);
            }
            
        }
    }

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
                
        startTimer()
        
        tl.to(".bracket", {
            duration: 0.3,
            scale: 1,
            margin: 0,
        });
        tl.to("#loader", {
            duration: 10,
        });

        // welcome screen
        welcomeScreen.to(".loading-section", {
            y: -10,
            opacity: 0,
        });
        welcomeScreen.to(".loading-screen", {
            duration: 0.8,
            y: -2000,
            ease: "Power4.out",
        });
        welcomeScreen.to(
            ".after-block",
            {
                duration: 0.8,
                y: -2000,
                ease: "Power4.out",
                onComplete: handleLoaderComplete,
            },
            "-=0.4"
        );
        
        // console.log(progress)
        // useLoading()
        // loader();
    }, [
        // progress
    ]);


    return (
        <>
        {/* This is for 3D */}
        {/* <Loader/> */}

        {/* This for the sample */}
        <div className="loading-screen absolute z-[13] h-screen w-full overflow-hidden text-white">
            <div className="loading-section absolute flex h-screen w-full items-center justify-center">
                <div className="title mx-5 font-playfair text-3xl font-medium italic tracking-wider">
                    Kaze
                </div>
                <div className="bracket bracket1 scale-50 font-playfair text-2xl">
                    (&nbsp;
                </div>
                <div id="loader" className="font-sprat text-2xl font-medium">
                    {time}%
                </div>
                <div className="bracket bracket2 scale-50 font-playfair text-2xl">
                    &nbsp;)
                </div>
                <div className="title mx-5 font-playfair text-3xl font-medium italic tracking-wider">
                    Artworks / Animations 
                </div>
            </div>
        </div>
        <div className="after-block absolute z-10 h-screen w-full"></div>
        </>
    );
};