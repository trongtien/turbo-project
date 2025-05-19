import { useContext } from 'react';
import { CRMLayoutContext, CRMLayoutContextDispatch } from '../components/app-theme-provider';

const useCrmLayout = () => {
	const context = useContext(CRMLayoutContext);
	if (!context) {
		throw new Error('useCrmLayout must be used within a RMLayoutPovider.');
	}

	return context;
};

const useCrmLayoutDispatch = () => {
	const context = useContext(CRMLayoutContextDispatch);
	if (!context) {
		throw new Error('useCrmLayoutDispatch must be used within a RMLayoutPovider.');
	}

	return context;
};

export { useCrmLayout, useCrmLayoutDispatch };
