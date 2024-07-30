import FileNameList from "./FileNameList";
import Edit from "./Edit";
import { useContext } from "react";
import { PlaygroundContext } from "../../PlayGroundContext";
import { debounce } from "lodash-es";
function CodeEdit() {
  const { theme, files, setFiles, selectedFileName } =
    useContext(PlaygroundContext);
  const file = files[selectedFileName];
  function onEditorChange(value?: string) {
    files[file.name].value = value!;
    setFiles({ ...files });
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <FileNameList></FileNameList>
      <Edit
        file={file}
        onChange={debounce(onEditorChange, 500)}
        options={{
          theme: `vs-${theme}`,
        }}
      />
    </div>
  );
}

export default CodeEdit;
