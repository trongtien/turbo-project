import CoreAppProvider from '@bds/design-layout/components/core-app-provider';
import TextArea from '@bds/design-layout/components/textArea';

function App() {
	return (
		<CoreAppProvider>
			<div className="test">
				<TextArea />
			</div>
		</CoreAppProvider>
	);
}

export default App;
