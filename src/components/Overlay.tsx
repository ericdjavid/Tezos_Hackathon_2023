import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Html, Scroll, ScrollControls, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import Expertises from "./Partners";
import Marquee from "./menu/Marquee";
import TextPlugin from "gsap/dist/TextPlugin";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import TeamCard from "./Team";


gsap.registerPlugin(ScrollTrigger);

const Section = (props) => {
    return (
        <section
            className={`h-screen flex justify-center align-top p-10 ${props.right ? "flex-row" : "items-start"
                }`}
            style={{
                opacity: props.opacity,
            }}
        >
            <div className="flex items-center justify-center w-full align-top">
                <div className="w-full h-full">
                    <div className="px-4 py-12 mt-6 text-white rounded-lg md:px-8">
                        {props.children}
                    </div>
                </div>
            </div>
        </section>
    );
};

export const Overlay = (props: any) => {
    const scroll = useScroll();
    const [opacityFirstSection, setOpacityFirstSection] = useState(1);
    const [opacitySecondSection, setOpacitySecondSection] = useState(1);
    const [opacityLastSection, setOpacityLastSection] = useState(1);

    useFrame(() => {
        setOpacityFirstSection(1 - scroll.range(0, 1 / props.pages));
        setOpacitySecondSection(scroll.curve(0.8 / props.pages, 1 / props.pages));
        setOpacityLastSection(scroll.range(2 / props.pages, 0.2 / props.pages));
    });

    useEffect(() => {
        if (Math.round(scroll.offset * 10) / 10 == 0.6) {
        }
    }, [scroll.offset])


    const comp = useRef(); // create a ref for the root level element (for scoping)
    const test = useRef();

    useLayoutEffect(() => {

        // create our context. This function is invoked immediately and all GSAP animations and ScrollTriggers created during the execution of this function get recorded so we can revert() them later (cleanup)
        let ctx = gsap.context(() => {

            // Our animations can use selector text like ".box" 
            // this will only select '.box' elements that are children of the component
            gsap.set(test.current, { y: 100, x: -50 })
            gsap.to(test.current, {
                scrollTrigger: {
                    trigger: test.current,
                    // toggleActions: "replay replay replay replay"

                }, // start the animation when ".box" enters the viewport (once)
                y: 0,
                x: 0,
                // opacity: 1,
                // rotation: 360,
                duration: 3
            })

        }, comp); // <- IMPORTANT! Scopes selector text

        return () => ctx.revert(); // cleanup

    }, []); // <- empty dependency Array so it doesn't re-run on every render

    return (
        <>
            <Scroll html>
                <div className="w-screen">
                    <Section opacity={opacityFirstSection} >
                        <div className="flex flex-col" ref={test}>
                            <h1 className="w-full text-5xl font-medium text-left md:text-center md:text-7xl">
                                <strong>Tezos x SIA Partners x Exaion</strong>
                            </h1>
                            <h2 className="w-full pt-4 text-2xl italic text-left md:text-center md:text-3xl">
                                Achète des produits des <span className="text red"> partenaires </span> du hackathon et reçois de la  <strong><span className="text">crypto</span></strong> </h2>
                        </div>
                        <div className="arrow absolute left-1/2 transform-translate-x-1/2">
                            <div className="w-10 h-10 border-b-4 border-r-4 border-white-900 animate-pulse transform rotate-45"></div>
                        </div>
                    </Section>
                    <Expertises opacity={opacitySecondSection} />
                    {/* <TeamCard/> */}
                </div>
            </Scroll>

        </>
    );
};