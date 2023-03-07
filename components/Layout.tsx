import { useGlobal } from "@/functionality/GlobalFunctionality";
import React, { useEffect, useRef } from "react";
// import { Navbar } from "./Navbar";
import "../node_modules/locomotive-scroll/dist/locomotive-scroll.css";
import { Loaders } from "./Loaders";
import LoadersIn3D from "./LoadersIn3D";

export const Layout: React.FC< { children : React.ReactNode} > = ({ children }) => {
  const { loaderComplete } = useGlobal();
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const scroll = import("locomotive-scroll").then((LocomotiveScroll) => {
      new LocomotiveScroll.default({
        el: scrollRef.current,
        smooth: true,
      });
    });
  }, []);

  return (
    <>
      {!loaderComplete && <Loaders />}
      <main
        ref={scrollRef}
        data-scroll-container
        className="fixed left-0 right-0 m-auto max-w-[1920px]"
      >
        {/* <Navbar /> */}
        {children}
      </main>
    </>
  );
};