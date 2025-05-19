import '../styles/tailwind.css';
import '../styles/main.scss';

import { createContext, useMemo, useState } from 'react';

import { type PropsWithChildren } from 'react';
import LoadingApp from './crm-layout/loading';

type CRMLayoutContextProps = {
	loading: boolean;
};

type CRMLayoutContextDispatchProps = {
	setLoading: (isLoading: boolean) => void;
};

const CRMLayoutContext = createContext<CRMLayoutContextProps>({
	loading: false,
});

const CRMLayoutContextDispatch = createContext<CRMLayoutContextDispatchProps>({
	setLoading: () => {},
});

const AppThemeProvider = ({ children }: PropsWithChildren) => {
	const [_loadingApp, _setLoadingApp] = useState<boolean>(false);

	const setLoading = (isLoading: boolean) => _setLoadingApp(isLoading);

	const contextDispatch = useMemo<CRMLayoutContextDispatchProps>(
		() => ({
			setLoading,
		}),
		[_setLoadingApp],
	);

	const contextAppLoadindState = useMemo<CRMLayoutContextProps>(
		() => ({
			loading: _loadingApp,
		}),
		[_loadingApp],
	);

	return (
		<CRMLayoutContextDispatch.Provider value={contextDispatch}>
			{children}
			<CRMLayoutContext value={contextAppLoadindState}>
				<LoadingApp />
			</CRMLayoutContext>
		</CRMLayoutContextDispatch.Provider>
	);
};

export { CRMLayoutContext, CRMLayoutContextDispatch };
export type { CRMLayoutContextProps, CRMLayoutContextDispatchProps };

export default AppThemeProvider;
