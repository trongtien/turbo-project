import AppThemeProvider from '@bds/design-layout/components/app-theme-provider';
import CRMLayout from '@bds/design-layout/components/crm-layout';

import './admin-ui-theme.scss';
import './tailwind.css';

function App() {
	return (
		<AppThemeProvider>
			<CRMLayout>CRM App Admin</CRMLayout>
		</AppThemeProvider>
	);
}

export default App;
