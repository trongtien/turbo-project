import * as React from 'react';
import styles from './Sidebar.module.scss';

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	asChild?: boolean;
}

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
	({ className, asChild = false, ...props }, ref) => {
		const Comp = asChild ? 'div' : 'header';

		return <Comp ref={ref} className={`${styles.sidebarHeader} ${className}`} {...props} />;
	},
);
SidebarHeader.displayName = 'SidebarHeader';

export default SidebarHeader;
