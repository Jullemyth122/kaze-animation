import React, { useEffect } from "react";
import { gsap } from "gsap";

const headerTl = gsap.timeline();

interface HeadingProps {
    loaderComplete: boolean;
}

const Heading: React.FC<HeadingProps>  = ({loaderComplete}) => {
    

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        if (loaderComplete) {
        headerTl
            .to(
                ".hidden-item",
                {
                    css: { visibility: "visible", overflow: "visible" },
                },
                "-=1"
            )
            .from(".line-block span", {
                duration: 1.8,
                delay: -1.4,
                y: 150,
                ease: "power4.out",
                skewY: 7,
                stagger: {
                    amount: 0.3,
                },
            })
            .to(".show-anim", {
                duration: 0.7,
                delay: -0.8,
                opacity: 1,
            });
        }
    }, [loaderComplete]);

    return (
        <header
        id="home"
        data-scroll-section
        className="z-10 flex h-screen flex-col items-center justify-center bg-[#000405]"
      >
            <p className="show-anim layer sub-text text-amber-200 overflow-hidden opacity-0">
                Header    
            </p>
      </header>
    )
}

export default Heading