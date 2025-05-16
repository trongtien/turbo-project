import '../styles/tailwind.css';
import '../styles/main.scss';

import { Fragment } from 'react';
import { type PropsWithChildren } from 'react';

const CoreAppProvider = ({ children }: PropsWithChildren) => {
	return <Fragment>{children}</Fragment>;
};

export default CoreAppProvider;
