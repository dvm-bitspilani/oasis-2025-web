import {useEffect} from "react";
export default function Preloader({onEnter}:{onEnter:()=>void;targetLocation:string|null}) {useEffect(onEnter,[onEnter]);return null;}
