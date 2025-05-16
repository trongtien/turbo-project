import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import styles from './SidebarMenuButton.module.scss';
import { TooltipContent } from '@radix-ui/react-tooltip';

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean;
	isActive?: boolean;
	tooltip?: string | React.ComponentProps<typeof TooltipContent>;
	variant?: 'default' | 'outline';
	size?: 'default' | 'sm' | 'lg';
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
	(
		{
			asChild = false,
			isActive = false,
			variant = 'default',
			size = 'default',
			tooltip,
			className = '',
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button';

		const button = (
			<Comp
				ref={ref}
				data-sidebar="menu-button"
				data-size={size}
				data-active={isActive}
				className={`
          ${styles.sidebarMenuButton}
          ${styles[`variant-${variant}`]}
          ${styles[`size-${size}`]}
          ${className}
        `}
				{...props}
			/>
		);

		return button;
	},
);

SidebarMenuButton.displayName = 'SidebarMenuButton';

export default SidebarMenuButton;
