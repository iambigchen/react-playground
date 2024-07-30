import { editor } from "monaco-editor";
import MonacoEditor, { OnMount, EditorProps } from "@monaco-editor/react";
import { createATA } from './ata';

export interface EditorFile {
  name: string;
  value: string;
  language: string;
}

interface Props {
  file: EditorFile;
  onChange?: EditorProps["onChange"];
  options?: editor.IStandaloneEditorConstructionOptions;
}
const Edit = (props: Props) => {
  const { file, onChange, options } = props;

  const handleEditorMount: OnMount = (editor, monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        jsx: monaco.languages.typescript.JsxEmit.Preserve,
        esModuleInterop: true,
    })

    const ata = createATA((code, path) => {
        monaco.languages.typescript.typescriptDefaults.addExtraLib(code, `file://${path}`)
    })

    editor.onDidChangeModelContent(() => {
        ata(editor.getValue());
    });

    ata(editor.getValue());
  }
  return (
    <MonacoEditor
      height={"100%"}
      path={file.name}
      language={file.language}
      value={file.value}
      onMount={handleEditorMount}
      onChange={onChange}
      options={
        {
            fontSize: 14,
            scrollBeyondLastLine: false,
            minimap: {
              enabled: false,
            },
            scrollbar: {
              verticalScrollbarSize: 6,
              horizontalScrollbarSize: 6,
            },
            ...options
        }
    }
    ></MonacoEditor>
  );
};

export default Edit;
