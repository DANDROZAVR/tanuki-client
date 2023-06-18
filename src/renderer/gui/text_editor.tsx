import './style.css';
import { React, useRef, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Options } from 'renderer/render_options';
import 'reactflow/dist/style.css';

export default function TextEditor({
  renderOptions,
  scriptValue,
  setScriptValue,
}: {
  renderOptions: Options;
  scriptState: FileState;
}) {
  const editorRef = useRef<string>(null);
  const [theme, setTheme] = useState('vs-light');

  useEffect(() => {
    async function getTheme() {
      const darkTheme = await window.theme.get();
      setTheme(darkTheme ? 'vs-dark' : 'vs-light');
    }
    getTheme();
  }, []);

  // eslint-disable-next-line no-unused-vars
  const onEditorMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const onChange = (newVal, e) => {
    setScriptValue(newVal);
  };

  return (
    <Editor
      value={scriptValue}
      width="100%"
      height="100vh"
      theme={theme}
      defaultLanguage={renderOptions.defaultLanguage}
      onChange={onChange}
      onMount={onEditorMount}
    />
  );
}
