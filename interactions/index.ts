import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hello } from "./components/hello";

export class Interactions {
  ismobile: boolean;
  components: ObjectStringMap = {};

  constructor() {
    gsap.registerPlugin(ScrollTrigger);

    this.onResize();
    this.createSmoothScroll();
    this.createPreloader();
    this.addEventListeners();
  }

  createSmoothScroll() {
    const lenis = new Lenis({
      lerp: 0.1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(time => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  createPreloader() {
    /**
     * - preload media
     * - initializations
     * - call onpreloaded on conpletion
     * */
    this.onPreloaded();
  }

  onPreloaded() {
    this.components.hello = new Hello();
  }

  onResize() {
    this.ismobile = window.innerWidth <= 700;
  }

  addEventListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
  }
}
