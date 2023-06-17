import { createRoot } from 'react-dom/client';
import { setChonkyDefaults, ChonkyActions } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';
import App from './App';

ClassNameGenerator.configure(
  (componentName) => `chonky-resolve-conflict-${componentName}`
);

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
setChonkyDefaults({
  iconComponent: ChonkyIconFA,
  defaultFileViewActionId: ChonkyActions.EnableListView.id,
});
root.render(<App />);
