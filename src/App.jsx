import Experience from "./components/3D/Experience";
import { atom, Provider } from "jotai";
import UI from "./components/global/UI";
import Loader from "./components/global/Loader";
import SplashCursor from "./components/global/Cursor";

export const toolTipAtom = atom(false);
export const audioPlayAtom = atom(false);

const App = () => {
  return (
    <Provider>
      <Loader />
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#A855F7"
      />
      <Experience />
      <UI />
    </Provider>
  );
};

export default App;
