import * as React from 'react';
import styles from './Sidebar.module.scss';

interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
	asChild?: boolean;
	active?: boolean;
}

const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(
	({ className, active = false, asChild = false, ...props }, ref) => {
		const Comp = asChild ? 'div' : 'div';

		return (
			<Comp
				ref={ref}
				className={`${styles.sidebarItem} ${active ? styles.active : ''} ${className}`}
				data-active={active}
				{...props}
			/>
		);
	},
);
SidebarItem.displayName = 'SidebarItem';

export default SidebarItem;
