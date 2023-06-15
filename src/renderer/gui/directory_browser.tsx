import './style.css';
import { React, useRef, useEffect, useState } from 'react';
import { ChonkyActions, FullFileBrowser } from 'chonky';
import { loadHomeDirectory } from '../network/client';
import 'reactflow/dist/style.css';

export default function DirectoryBrowser(/* {
  renderOptions,
  scriptState,
}: {
  renderOptions: Options;
  scriptState: FileState;
} */) {
  const editorRef = useRef<string>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [directoryList, setDirectoryList] = useState([]);

  useEffect(() => {
    async function getTheme() {
      const darkTheme = await window.theme.get();
      setIsDarkTheme(darkTheme);
    }
    getTheme();
    loadHomeDirectory((entries) => {
      console.log(entries);
      setDirectoryList(entries);
    });
  }, []);

  return (
    <>
      <FullFileBrowser
        defaultFileViewActionId={ChonkyActions.EnableListView.id}
        disableDefaultFileActions={[ChonkyActions.EnableListView.id, ChonkyActions.EnableCompactView.id, ChonkyActions.EnableGridView.id]}
        darkMode={isDarkTheme}
        files={directoryList.map((el) => ({
          id: el.title,
          name: el.title,
          isDir: el.isDir,
        }))}
      />
      <button type="button">Action button (TBA)</button>
    </>
  );
}
