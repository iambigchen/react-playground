import PlayGround from "./playground/index";
import { PlaygroundProvider } from "./playground/PlayGroundContext";
function App() {
  return <PlaygroundProvider>
    <PlayGround></PlayGround>
  </PlaygroundProvider>;
}

export default App;
