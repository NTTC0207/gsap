import { LegacyRef, MutableRefObject, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Lenis from "lenis"
import "./styles.css"

gsap.registerPlugin(useGSAP, ScrollTrigger)
export const Landing = () => {

    const imageRef = useRef<any>()

    useGSAP(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        })

        function raf(time: any) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        let scrollSection = gsap.utils.toArray('.scroll')

        gsap.to(scrollSection, {
            xPercent: -100 * (scrollSection.length - 1),
            ease: "none", // <-- IMPORTANT!
            scrollTrigger: {
                trigger: ".scrollWrapper",
                pin: true,
                scrub: 0.1,
                //snap: directionalSnap(1 / (sections.length - 1)),
                end: "+=3000"
            }
        })


        gsap.to('.imageWrapper', {
            opacity: 1,
            scrollTrigger: {
                trigger: '.imageWrapper',
                scrub: 2,
                start: 'top 30%',
                end: 'top 0%',
                // markers: true
            }
        })

        gsap.to(".horse", {
            scale: 3.5,
            scrollTrigger: {
                trigger: ".horse",
                scrub: true,
                pin: true,
                start: 'center center',
                end: '+=900',
                // markers: true
            }

        })


    })
    return (
        <>
            <div className="landingWrapper"></div>

            <div className="scrollWrapper">
                <div className="scroll div1">1</div>
                <div className="scroll div2">2</div>
                <div className="scroll div3">3</div>
                <div className="scroll div4">4</div>
            </div>


            <div className="imageWrapper">
                <div className="imageList">
                    <img src={'/images/horse.jpg'} alt='hero-image' className="horse" ref={imageRef} />
                </div>
            </div>
        </>
    )
}