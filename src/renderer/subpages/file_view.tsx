import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { renderOptions } from 'renderer/render_options';
import TextEditor from '../gui/text_editor';

function FileViewScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  function goBack() {
    navigate('/home');
  }

  console.log(state);

  return (
    <div>
      <TextEditor
        renderOptions={renderOptions}
        editorTheme={location.state.themeState}
        scriptState={location.state.scriptState}
      />
      <button type="button" onClick={goBack}>
        Go back
      </button>
    </div>
  );
}

export default FileViewScreen;
