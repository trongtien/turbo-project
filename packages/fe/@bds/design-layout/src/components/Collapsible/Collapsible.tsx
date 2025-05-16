import * as React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import styles from './Collapsible.module.scss';

interface CollapsibleProps {
	children: React.ReactNode;
	trigger: React.ReactNode;
	defaultOpen?: boolean;
	disabled?: boolean;
	className?: string;
}

const Collapsible = ({
	children,
	trigger,
	defaultOpen = false,
	disabled = false,
	className = '',
}: CollapsibleProps) => {
	const [open, setOpen] = React.useState(defaultOpen);

	return (
		<CollapsiblePrimitive.Root
			className={`${styles.collapsibleRoot} ${className}`}
			open={open}
			onOpenChange={setOpen}
			disabled={disabled}
		>
			<CollapsiblePrimitive.Trigger className={styles.collapsibleTrigger} disabled={disabled}>
				{trigger}
				<ChevronDown className={styles.collapsibleChevron} size={16} />
			</CollapsiblePrimitive.Trigger>

			<CollapsiblePrimitive.Content className={styles.collapsibleContent}>
				{children}
			</CollapsiblePrimitive.Content>
		</CollapsiblePrimitive.Root>
	);
};

export default Collapsible;
