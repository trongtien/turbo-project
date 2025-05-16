import * as React from 'react';
import styles from './SidebarMenuItem.module.scss';

interface SidebarMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
	className?: string;
}

const SidebarMenuItem = React.forwardRef<HTMLLIElement, SidebarMenuItemProps>(
	({ className = '', ...props }, ref) => {
		return (
			<li
				ref={ref}
				data-sidebar="menu-item"
				className={`${styles.sidebarMenuItem} group ${className}`}
				{...props}
			/>
		);
	},
);

SidebarMenuItem.displayName = 'SidebarMenuItem';
export default SidebarMenuItem;
