import './style.css';
import { React, useEffect, useState } from 'react';
import { ChonkyActions, FullFileBrowser } from 'chonky';
import { TextDialog } from './util';
import {
  setCurrentPath,
  getCurrentPath,
  loadCurrentDirectory,
  loadHomeDirectory,
  createDirectory,
  deleteScript,
} from '../network/client';

export default function FileBrowser({
  onOpenFile,
}: {
  // eslint-disable-next-line no-unused-vars
  onOpenFile: (val: string) => void;
}) {
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [entries, setEntries] = useState([]);
  const [path, setPath] = useState('');

  useEffect(() => {
    async function getTheme() {
      const darkTheme = await window.theme.get();
      setIsDarkTheme(darkTheme);
    }
    getTheme();
    loadHomeDirectory((e) => {
      setEntries(e);
      setPath(getCurrentPath());
    });
  }, []);

  const handleAction = (data) => {
    if (data.id === ChonkyActions.OpenFiles.id) {
      const fileToOpen = data.payload.targetFile ?? data.payload.files[0];
      if (fileToOpen.isDir) {
        setCurrentPath(`${fileToOpen.id}/`);
        setPath(`${fileToOpen.id}/`);
        loadCurrentDirectory((e) => {
          setEntries(e);
        });
      } else {
        onOpenFile(fileToOpen.name);
      }
    } else if (data.id === ChonkyActions.DeleteFiles.id) {
      const filesToDelete = data.state.selectedFiles;
      filesToDelete.forEach((el) => {
        deleteScript({ name: el.name, isDirectory: el.isDir })
          .then(() => {
            return loadCurrentDirectory((e) => {
              setEntries(e);
            });
          })
          .catch((e) => {
            console.log(e);
          });
      });
    } else if (data.id === ChonkyActions.CreateFolder.id) {
      setNewFolderDialogOpen(true);
      loadCurrentDirectory((e) => {
        setEntries(e);
      });
    }
  };

  const folderChain =
    path.length > 0
      ? path
          .split('/')
          .filter((el) => el !== '')
          .reduce(
            (a, b, i) =>
              i === 0
                ? [{ name: b, path: b }]
                : [...a, { name: b, path: `${a[i - 1].path}/${b}` }],
            0
          )
          .map((el) => ({
            id: el.path,
            name: el.name,
            isDir: true,
          }))
      : [];

  const files = entries.map((el) => ({
    id: `${path}${el.title}`,
    name: el.title,
    isDir: el.isDirectory === 1,
  }));

  const newFolderDialog = (
    <TextDialog
      open={newFolderDialogOpen}
      onSubmit={(value) => {
        createDirectory(value)
          .then(() => {
            return loadCurrentDirectory((entriesList) => {
              setEntries(entriesList);
            });
          })
          .catch((e) => {
            console.log(e);
          });
        setNewFolderDialogOpen(false);
      }}
      onCancel={() => {
        setNewFolderDialogOpen(false);
      }}
      label="Create directory"
    />
  );

  return (
    <>
      <FullFileBrowser
        disableDragAndDrop
        className="file_browser"
        defaultFileViewActionId={ChonkyActions.EnableListView.id}
        fileActions={[ChonkyActions.DeleteFiles, ChonkyActions.CreateFolder]}
        disableDefaultFileActions={[ChonkyActions.OpenSelection]}
        darkMode={isDarkTheme}
        folderChain={folderChain}
        files={files}
        onFileAction={handleAction}
      />
      {newFolderDialog}
    </>
  );
}
