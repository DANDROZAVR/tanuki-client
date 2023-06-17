import { React, useEffect, useState } from 'react';
import { ChonkyActions, FullFileBrowser } from 'chonky';
import { useTheme } from '@mui/material/styles';
import { TextDialog } from './util';
import {
  setCurrentPath,
  getCurrentPath,
  loadCurrentDirectory,
  loadHomeDirectory,
  createDirectory,
  deleteScript,
} from '../network/client';

export default function RemoteFileBrowser({
  onOpenFile,
}: {
  // eslint-disable-next-line no-unused-vars
  onOpenFile: (val: string) => void;
}) {
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const theme = useTheme();
  const [entries, setEntries] = useState([]);
  const [path, setPath] = useState('');

  useEffect(() => {
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
      title="Create new directory"
      label="Directory name"
    />
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FullFileBrowser
        disableDragAndDrop
        className="file_browser"
        defaultFileViewActionId={ChonkyActions.EnableListView.id}
        fileActions={[ChonkyActions.DeleteFiles, ChonkyActions.CreateFolder]}
        disableDefaultFileActions={[
          ChonkyActions.SelectAllFiles.id,
          ChonkyActions.OpenSelection.id,
        ]}
        darkMode={theme.palette.mode === 'dark'}
        folderChain={folderChain}
        files={files}
        onFileAction={handleAction}
      />
      {newFolderDialog}
    </div>
  );
}
