import Lenis from "@studio-freight/lenis";

let lenis;

export const initLenis = () => {
    lenis = new Lenis({
        duration: 1.2,          // smoothness level
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
};

export const destroyLenis = () => {
    if (lenis) {
        lenis.destroy();
        lenis = null;
    }
};
