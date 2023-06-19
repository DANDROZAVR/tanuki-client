import FileState from './fileState.ts';

let url = 'http://localhost:3001';

let signedUsername = '';
let signedPassword = '';
let currentDir = '';
let logs:string[] = ["cokolwiek"];
export {logs}

export function setCurrentPath(path: string) {
  currentDir = path;
}

export function getCurrentPath() {
  return currentDir;
}

export interface DirInfo {
  title: string;
  description: string;
  isDirectory: boolean;
}

async function sendRequest(message: string, callback) {
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.onreadystatechange = function onStateChange() {
    if (request.readyState === 4 && request.status === 200) {
      const response = JSON.parse(request.response);
      callback(response);
      //alert(response.message);
    }
  };
  request.setRequestHeader('Content-type', 'application/json');
  request.send(message);
}

export async function sendScript(
  script: string,
  scriptName: string,
  description = '',
  pureJSCode: boolean = false
) {
  sendRequest(
    JSON.stringify({
      type: 'insertScript',
      user: signedUsername,
      password: signedPassword,
      title: scriptName,
      source: script,
      currentDir,
      description,
      pureJSCode
    }),
    (response) => {logs.push(response.message)}
  );
  return scriptName;
}

export async function sendNodes(
  script: string,
  edges: string,
  scriptName: string,
  description = ''
) {
  sendRequest(
    JSON.stringify({
      type: 'insertScript',
      user: signedUsername,
      password: signedPassword,
      title: scriptName,
      source: '',
      sourceEdges: edges,
      sourceNodes: script,
      currentDir,
      description,
    }),
    (response) => {logs.push(response.message)}
  );
  return scriptName;
}

export async function updateScript(
  script: string,
  scriptName: string,
  description = '',
  pureJSCode = false
) {
  sendRequest(
    JSON.stringify({
      type: 'updateScript',
      user: signedUsername,
      password: signedPassword,
      path: currentDir + scriptName,
      description,
      source: script,
      pureJSCode
    }),
    (response) => {}
  );
  return scriptName;
}

export async function sendOrUpdate(
  script: string,
  scriptName: string,
  description = '',
  pureJSCode = false
) {
  sendRequest(
    JSON.stringify({
      type: 'insertScript',
      user: signedUsername,
      password: signedPassword,
      title: scriptName,
      source: script,
      currentDir,
      description,
      pureJSCode
    }),
    (response) => {
      logs.push(response.message)
      if (
        response.status == 1 &&
        response.message == "Script with that name already exists"
      ) {
        updateScript(script, scriptName, description, pureJSCode);
      }
    }
  );
  return scriptName;
}

export async function updateNodes(
  script: string,
  edges: string,
  scriptName: string,
  description = ''
) {
  sendRequest(
    JSON.stringify({
      type: 'updateScript',
      user: signedUsername,
      password: signedPassword,
      path: currentDir + scriptName,
      description,
      source: '',
      sourceNodes: script,
      sourceEdges: edges,
    }),
    (response) => {logs.push(response.message)}
  );
  return scriptName;
}

export async function sendOrUpdateNodes(
  script: string,
  edges: string,
  scriptName: string,
  description = ''
) {
  sendRequest(
    JSON.stringify({
      type: 'insertScript',
      user: signedUsername,
      password: signedPassword,
      title: scriptName,
      source: '',
      sourceNodes: script,
      sourceEdges: edges,
      currentDir,
      description,
    }),
    (response) => {
      console.log(response);
      if (
        response.status == 1 &&
        response.message == "Script with that name already exists"
      ) {
        updateNodes(script, edges, scriptName, description);
      }
    }
  );
  return scriptName;
}

export async function execScript(scriptName: string, callback) {
  sendRequest(
    JSON.stringify({
      type: 'execScript',
      user: signedUsername,
      password: signedPassword,
      path: currentDir + scriptName,
    }),
    callback
  );
}

export async function loadScript(
  dirInfo: DirInfo,
  scriptCallback,
  directoryCallback
) {
  if (dirInfo.isDirectory) {
    const newPath = `${currentDir}${dirInfo.name}/`;
    sendRequest(
      JSON.stringify({
        type: 'loadDirectory',
        user: signedUsername,
        password: signedPassword,
        path: newPath,
      }),
      (response) => {
        logs.push(response.message)
        if (response.status === 0) {
          currentDir = newPath;
          directoryCallback(response.contents);
        }
      }
    );
  } else {
    sendRequest(
      JSON.stringify({
        type: 'loadScript',
        user: signedUsername,
        password: signedPassword,
        path: currentDir + dirInfo.name,
      }),
      (response) => {
        logs.push(response.message)
        if (response.status === 0) {
          const scriptState = {
            scriptName: dirInfo.name,
            ...response.message,
            defaultLanguage: 'typescript',
          } as FileState;
          scriptCallback(scriptState);
        }
      }
    );
  }
}

export async function loadCurrentDirectory(callback) {
  sendRequest(
    JSON.stringify({
      type: 'loadDirectory',
      user: signedUsername,
      password: signedPassword,
      path: currentDir,
    }),
    (response) => {
      logs.push(response.message)
      if (response.status === 0) {
        // in response.message.contents we get array of dirInfo - contents of chosen directory
        const contents = response.message.contents as DirInfo[];
        callback(contents);
      }
    }
  );
}

export async function loadParentDirectory(callback) {
  sendRequest(
    JSON.stringify({
      type: 'getParent',
      user: signedUsername,
      password: signedPassword,
      path: currentDir,
    }),
    (response) => {
      logs.push(response.message)
      if (response.status === 0) {
        currentDir = response.path;
        loadCurrentDirectory(callback);
      }
    }
  );
}

export async function loadHomeDirectory(callback) {
  currentDir = `${signedUsername}/`;
  loadCurrentDirectory(callback);
}

export async function createDirectory(name: string, description = '') {
  sendRequest(
    JSON.stringify({
      type: 'createDirectory',
      user: signedUsername,
      password: signedPassword,
      name,
      currentDir,
      description,
    }),
    (response) => {logs.push(response.message)}
  );
}

export async function deleteScript(dirInfo: DirInfo) {
  sendRequest(
    JSON.stringify({
      type: 'deleteScript',
      user: signedUsername,
      password: signedPassword,
      path: currentDir + dirInfo.name + (dirInfo.isDirectory ? '/' : ''),
    }),
    (response) => {logs.push(response.message)}
  );
}

export async function createUser(username: string, password: string, callback) {
  sendRequest(
    JSON.stringify({
      type: 'createUser',
      user: username,
      password,
    }),
    callback
  );
}

export async function logIn(username: string, password: string, callback) {
  sendRequest(
    JSON.stringify({
      type: 'signIn',
      user: username,
      password,
    }),
    (response) => {
      if (response.status === 0) {
        signedUsername = username;
        signedPassword = password;
        currentDir = `${username}/`;
      }
      callback(response);
    }
  );
}

export async function scheduleScript(scriptName: string, scheduleTime: string) {
  sendRequest(
    JSON.stringify({
      type: 'scheduleScript',
      user: signedUsername,
      password: signedPassword,
      path: currentDir + scriptName,
      scheduleOptions: {
        tag: 'once',
        once: {
          date: scheduleTime,
        },
      },
    }),
    (response) => {logs.push(response.message)}
  );
}

export async function logOut() {
  signedUsername = '';
  signedPassword = '';
}

export async function pickServer(serverUrl: string) {
  url = serverUrl;
}
