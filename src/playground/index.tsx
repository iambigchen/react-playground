import Header from "./components/Header";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "./index.scss";
import { useContext } from "react";
import { PlaygroundContext } from "./PlayGroundContext";
import CodeEdit from "./components/CodeEdit";
import Preview from "./components/Preview";
function PlayGround () {
  const { theme } = useContext(PlaygroundContext);

  return (
    <div
    className={`${theme}`}
    style={{height: '100vh'}}>
      <Header />
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={0}>
          <CodeEdit/>
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <Preview/>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};
export default PlayGround