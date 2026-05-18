import { Stars } from "@react-three/drei";

const BG = () => {
  return (
    <Stars
      radius={60}
      depth={80}
      count={15000} 
      factor={2} 
      saturation={0}
      fade
      speed={0.2} 
    />
  );
};

export default BG;
