import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RequestFieldAndButton } from '../gui/util';
import { DirInfo, loadScript, logOut } from '../network/client';
import DirectoryBrowser from '../gui/directory_browser';

export default function ScriptManagerScreen() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');

  function onLoadScript(scriptName: string) {
    loadScript(
      {
        name: scriptName,
        description: '',
        isDirectory: false,
      } as DirInfo,
      (scriptState) => {
        navigate('/file_view', {
          state: {
            scriptState,
          },
        });
      },
      (directoryState) => {}
    );
  }

  function goToPlayground() {
    navigate('/playground');
  }

  function onLogOut() {
    logOut();
    navigate('/login');
  }

  return (
    <>
      <DirectoryBrowser />
      <section className="form-section">
        <RequestFieldAndButton
          id="loadScript"
          placeholder="script"
          buttonText="Load script"
          callback={(str) => onLoadScript(str)}
        />
      </section>
      <button type="button" onClick={goToPlayground}>
        Go to playground
      </button>
      <span className="red">{errorMessage}</span>
      <button type="button" onClick={onLogOut}>
        Log Out
      </button>
    </>
  );
}
