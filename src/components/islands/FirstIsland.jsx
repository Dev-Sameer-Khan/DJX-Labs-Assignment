import { useRef } from "react";
import { Text3D, useCursor, useGLTF } from "@react-three/drei";
import { useState } from "react";
import { useEffect } from "react";

export function FirstIsland(props) {
  const { nodes, materials } = useGLTF("/SkyIsland.glb");

  const [hover, setHover] = useState(false);

  useCursor(hover);

  const group = useRef(null);

  const handleClick = () => {
    let frame;
    const initialRot = group.current.rotation.y;
    const targetRot = initialRot + 2 * Math.PI;
    const duration = 600; // ms
    const startTime = performance.now();
    function animate(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      group.current.rotation.y = initialRot + (targetRot - initialRot) * t;
      if (t < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        group.current.rotation.y = targetRot;
      }
    }
    frame = requestAnimationFrame(animate);
  };


  return (
    <group
      ref={group}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      {...props}
      dispose={null}
      onClick={handleClick}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Launcher002.geometry}
        material={materials.PaletteMaterial001}
        position={[1.004, -0.001, 3.284]}
      />

      <Text3D
        font={"/Inter.json"}
        position={[-0.9, 0.2, 0]}
        rotation={[0, -0.4, 0]}
        scale={0.7}
        bevelEnabled
        bevelThickness={0.1}
        castShadow
        receiveShadow
      >
        Services
        <meshStandardMaterial color={"#E6E6FA"} />
      </Text3D>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lights.geometry}
        material={materials.PaletteMaterial002}
        position={[-1.388, 1.999, -2.364]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lights002.geometry}
        material={materials.PaletteMaterial003}
        position={[-2.35, 2.026, -1.839]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Island_Baked.geometry}
        material={materials["MergedBake_Baked.022"]}
        position={[0, 0.494, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Table_Baked.geometry}
        material={materials["MergedBake_Baked.022"]}
        position={[1.723, 0.235, 1.398]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lantern005_Baked.geometry}
        material={materials.PaletteMaterial004}
        position={[-1.561, -0.268, 3.256]}
        rotation={[-2.848, -1.209, -2.744]}
      />
    </group>
  );
}

useGLTF.preload("/SkyIsland.glb");
