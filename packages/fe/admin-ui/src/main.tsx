import './admin-ui-theme.scss';
import '../node_modules/@project/design-layout/dist/style-design-layout.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
