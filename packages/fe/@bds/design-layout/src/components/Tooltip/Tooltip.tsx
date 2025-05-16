import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import styles from './Tooltip.module.scss';

interface TooltipProps {
	content: React.ReactNode;
	children: React.ReactElement;
	delayDuration?: number;
	side?: 'top' | 'right' | 'bottom' | 'left';
	align?: 'start' | 'center' | 'end';
	showArrow?: boolean;
	className?: string;
}

const Tooltip = ({
	content,
	children,
	delayDuration = 300,
	side = 'top',
	align = 'center',
	showArrow = true,
	className = '',
}: TooltipProps) => {
	return (
		<TooltipPrimitive.Provider>
			<TooltipPrimitive.Root delayDuration={delayDuration}>
				<TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
				<TooltipPrimitive.Portal>
					<TooltipPrimitive.Content
						side={side}
						align={align}
						className={`${styles.tooltipContent} ${className}`}
						sideOffset={5}
					>
						{content}
						{showArrow && <TooltipPrimitive.Arrow className={styles.tooltipArrow} />}
					</TooltipPrimitive.Content>
				</TooltipPrimitive.Portal>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	);
};

export default Tooltip;
