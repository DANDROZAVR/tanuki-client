import { createRoot } from 'react-dom/client';
import { setChonkyDefaults, ChonkyActions } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
setChonkyDefaults({
  iconComponent: ChonkyIconFA,
  defaultFileViewActionId: ChonkyActions.EnableListView.id
});
root.render(<App />);
