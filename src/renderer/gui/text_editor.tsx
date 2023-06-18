import './style.css';
import { React, useRef, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Options } from 'renderer/render_options';
import { sendScript, execScript, scheduleScript, sendOrUpdate } from '../network/client.ts';
import 'reactflow/dist/style.css';
import { FunctionButton } from './util';
import ThemeSelector from './theme_selector';

export default function TextEditor({
  renderOptions,
  scriptState,
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

  return (
    <>
      <Editor
        value={scriptState.value}
        width="100%"
        height="100vh"
        theme={theme}
        defaultLanguage={renderOptions.defaultLanguage}
        onMount={onEditorMount}
      />
      <FunctionButton
        id="scriptTitle"
        buttonText="Send"
        placeholder={scriptState.scriptName}
        onClick={(input) => {
          sendOrUpdate(editorRef.current.getValue(), input);
        }}
      />
      <FunctionButton
        id="scriptToRun"
        buttonText="Run script"
        placeholder="script"
        onClick={(input) => {
          execScript(input);
        }}
      />
        <input id="scheduleTitle" type="text" placeholder="my_script" />
        <input
          id="scheduleTime"
          type="text"
          placeholder={new Date().toLocaleString()}
        />
        <button
          type="button"
          onClick={(str) => {
            const title = document.getElementById(
              'scheduleTitle'
            ) as HTMLInputElement | null;
            const time = document.getElementById(
              'scheduleTime'
            ) as HTMLInputElement | null;
            scheduleScript(title?.value, time?.value);
          }}
        >
          Schedule
        </button>
    </>
  );
}
