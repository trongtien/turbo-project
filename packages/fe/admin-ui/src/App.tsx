import AppThemeProvider from '@project/design-layout/components/app-theme-provider';
import CRMLayout from '@project/design-layout/components/crm-layout';

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
