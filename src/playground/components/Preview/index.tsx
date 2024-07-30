import { useContext, useState, useRef, useEffect } from "react";
import { PlaygroundContext } from "../../PlayGroundContext";
import CompilerWorker from './compiler.worker?worker'
import { debounce } from "lodash-es";
import iframeRaw from './iframe.html?raw'
import { IMPORT_MAP_FILE_NAME } from "../../file";


function Preview() {
  const { files } = useContext(PlaygroundContext);
  const [compiledCode, setCompiledCode] = useState("");
  const [iframeUrl, setIframeUrl] = useState(getIframeUrl());
  const compilerWorkerRef = useRef<Worker>();
  useEffect(() => {
    if (!compilerWorkerRef.current) {
      compilerWorkerRef.current = new CompilerWorker();
      compilerWorkerRef.current.addEventListener("message", ({ data }) => {
        console.log("worker", data);
        if (data.type === "COMPILED_CODE") {
          setCompiledCode(data.data);
        } else {
          // console.log('error', data);
        }
      });
    }
  }, []);
  useEffect(() => {
    setIframeUrl(getIframeUrl())
}, [files[IMPORT_MAP_FILE_NAME].value, compiledCode]);
  useEffect(debounce(() => {
    compilerWorkerRef.current?.postMessage(files)
}, 500), [files]);

function getIframeUrl () {
    const res = iframeRaw.replace(
        '<script type="importmap"></script>', 
        `<script type="importmap">${
            files[IMPORT_MAP_FILE_NAME].value
        }</script>`
    ).replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${compiledCode}</script>`,
    )
    return URL.createObjectURL(new Blob([res], { type: 'text/html' }))
}
  return (
    <div style={{ height: "100%" }}>
      <iframe
        src={iframeUrl}
        style={{
          width: "100%",
          height: "100%",
          padding: 0,
          border: "none",
        }}
      />
      {/* <Message type="error" content={error} /> */}

      {/* <Editor
        file={{
          name: "dist.js",
          value: compiledCode,
          language: "javascript",
        }}
      /> */}
    </div>
  );
}

export default Preview;
