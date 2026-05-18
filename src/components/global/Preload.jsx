import { PositionalAudio } from "@react-three/drei";

const Preloader = () => {
  return (
    <>
      <PositionalAudio
        distance={20}
        url={"/home.mp3"}
        autoplay={false}
        loop={false}
      />
      <PositionalAudio url={"/click.mp3"} autoplay={false} loop={false} />
    </>
  );
};

export default Preloader;
