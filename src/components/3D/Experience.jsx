import { Canvas } from "@react-three/fiber";
import {
  Environment,
  ScrollControls,
  Stats,
} from "@react-three/drei";
import Scene from "./Scene";
import BG from "../global/BG";
import { Suspense } from "react";
import Preloader from "../global/Preload";

const Experience = () => (
  <main className="w-full h-screen bg-black">
    {/* <Loader /> */}
    <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
      <color attach="background" args={["#000"]} />
      <fog attach="fog" args={["#000", 10, 50]} />
      <Environment preset="sunset" />
      <BG />
      {/* <Stats /> uncomment this for check fps */}
      <ScrollControls pages={5} infinite damping={0.15}>
        <Suspense fallback={null}>
          <Preloader />
          <Scene />
        </Suspense>
      </ScrollControls>
    </Canvas>
  </main>
);

export default Experience;
