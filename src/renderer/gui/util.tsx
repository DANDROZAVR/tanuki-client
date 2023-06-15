import { React, useState } from 'react';

export function RequestFieldAndButton({
  id,
  placeholder,
  buttonText,
  callback,
}: {
  id: string;
  placeholder: string;
  buttonText: string;
  callback;
}) {
  const [textValue, setTextValue] = useState('');
  return (
    <>
      <input
        id={id}
        value={textValue}
        type="text"
        placeholder={placeholder}
        onChange={(e) => setTextValue(e.target.value)}
      />
      <button type="button" onClick={() => callback(textValue)}>
        {buttonText}
      </button>
    </>
  );
}

export function FunctionButton({
  id,
  buttonText,
  placeholder,
  onClick,
}: {
  id: string;
  buttonText: string;
  placeholder: string;
  onClick: any;
}) {
  const [contents, setContents] = useState('');
  return (
    <section className="form-section">
      <input
        id={id}
        value={contents}
        type="text"
        placeholder={placeholder}
        onChange={(e) => setContents(e.target.value)}
      />
      <button type="button" onClick={() => onClick(contents)}>
        {buttonText}
      </button>
    </section>
  );
}
