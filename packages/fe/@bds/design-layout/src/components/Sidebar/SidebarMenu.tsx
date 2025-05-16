import { forwardRef } from 'react';
import style from './SidebarMenu.module.scss';

const SidebarMenu = forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
	({ className = '', ...props }, ref) => (
		<ul
			ref={ref}
			data-sidebar="menu"
			className={`${style['sidebar-menu']} ${className}`}
			{...props}
		/>
	),
);

SidebarMenu.displayName = 'SidebarMenu';
export default SidebarMenu;
