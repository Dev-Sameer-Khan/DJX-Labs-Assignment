import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, PositionalAudio, useScroll } from "@react-three/drei";
import { useEffect } from "react";
import gsap from "gsap";
import { FirstIsland } from "../islands/FirstIsland";
import { SecondIsland } from "../islands/SecondIsland";
import { audioPlayAtom } from "../../App";
import { useAtom } from "jotai";
import { useState } from "react";
import { UIAtom } from "../global/ui.jotai";
import { ThirdIsland } from "../islands/ThirdIsland";

const Scene = () => {
  const { camera } = useThree();
  const scroll = useScroll();

  const [ui, setUI] = useAtom(UIAtom);

  const tl = useRef();

  useEffect(() => {
    gsap.fromTo(
      camera.position,
      {
        y: 10,
        x: 10,
      },
      {
        y: 0,
        x: 0,
        delay: 2,
      },
    );

    tl.current = gsap.timeline({ paused: true, defaults: { ease: "none" } });

    tl.current.to(
      camera.position,
      {
        z: -20,
      },
      "a",
    );
    tl.current.to(
      camera.position,
      {
        x: 20,
      },
      "a",
    );
    tl.current.to(
      camera.position,
      {
        z: -60,
      },
      "b",
    );
    tl.current.to(
      camera.position,
      {
        x: -20,
      },
      "b",
    );
    tl.current.to(
      camera.position,
      {
        z: -85,
      },
      "c",
    );
    tl.current.to(
      camera.position,
      {
        x: 0,
      },
      "c",
    );
  }, []);

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  const audio = useRef(null);

  // The sound might not play because autoplay is often blocked until user interaction,
  // and the way the listener is attached could create multiple play calls or race conditions.
  // Let's improve the implementation:

  //   const [ui, setUI] = useAtom(UIAtom);
  const [visible, setVisible] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const scrollRef = useRef(null);

  const select = (key) => {
    if (ui.current === key) {
      setVisible(false);
      audio.current.play();
      setTimeout(() => setUI((s) => ({ ...s, current: null })), 380);
      return;
    }
    if (visible) {
      setVisible(false);
      setTimeout(() => {
        setUI((s) => ({ ...s, current: key }));
        setAnimKey((k) => k + 1);
        scrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
        setVisible(true);
      }, 300);
    } else {
      setUI((s) => ({ ...s, current: key }));
      setAnimKey((k) => k + 1);
      setVisible(true);
      audio.current.play();
    }
  };

  
const isMobile = window.innerWidth <= 599;


const move = useRef(null)

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!move.current) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 + 1;
      move.current._targetPos = {
        x: x ,
        y: -y,
      };
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame(() => {
    if (move.current) {
      if (!move.current._targetPos) move.current._targetPos = { x: 0, y: 0 };
      move.current.position.x += (move.current._targetPos.x - move.current.position.x) * 0.05;
      move.current.position.y += (move.current._targetPos.y - move.current.position.y) * 0.05 ;
    }
  });


  return (
    <>
      <group ref={move} position={[0, -2, 0]}>
        <PositionalAudio
          distance={20}
          ref={audio}
          url={"/click.mp3"}
          autoplay={false}
          loop={false}
        />
        {/* Island 1 */}
        <group onClick={() => select("services")}>
          <Float floatIntensity={0.5} speed={1} rotationIntensity={0.05}>
            <FirstIsland scale={isMobile ? .8 : 2} position={[20, 0, -40]} />
          </Float>
        </group>

        {/* Island 2 */}
        <group onClick={() => select("about")}>
          <Float floatIntensity={0.5} speed={1} rotationIntensity={0.05}>
            <SecondIsland scale={isMobile ? .017 : 0.05} />
          </Float>
        </group>

        {/* Island 3 */}
        <group onClick={() => select("works")}>
          <Float floatIntensity={0.5} speed={1} rotationIntensity={0.05}>
            <ThirdIsland scale={isMobile ? 1.5 :3} position-y={-2} position={[-20, 0, -80]} />
          </Float>
        </group>
      </group>

      <group position={[0, -2, -100]}>
        {/* Island 1 */}
        <group onClick={() => select("services")}>
          <FirstIsland position={[20, 0, -40]} />
        </group>

        {/* Island 2 */}
        <group onClick={() => select("about")}>
          <SecondIsland scale={isMobile ? .015 : .05} />
        </group>

        {/* Island 3 */}
        <group onClick={() => select("works")}>
          <ThirdIsland position-y={-0.5} position={[-20, 0, -80]} />
        </group>
      </group>
    </>
  );
};

export default Scene;
