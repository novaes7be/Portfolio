import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
gsap.defaults({ ease: 'power3.out', duration: 0.9 });

export const REDUCED = '(prefers-reduced-motion: reduce)';
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const prefersReduced = () => matchMedia(REDUCED).matches;
export const finePointer = () => matchMedia('(pointer: fine) and (hover: hover)').matches;

export { gsap, ScrollTrigger, SplitText, useGSAP };
