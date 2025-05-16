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

const CollapsibleRoot = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

const Collapsible = ({
	children,
	trigger,
	defaultOpen = false,
	disabled = false,
	className = '',
}: CollapsibleProps) => {
	const [open, setOpen] = React.useState(defaultOpen);

	return (
		<CollapsibleRoot
			className={`${styles.collapsibleRoot} ${className}`}
			open={open}
			onOpenChange={setOpen}
			disabled={disabled}
		>
			<CollapsibleTrigger className={styles.collapsibleTrigger} disabled={disabled}>
				{trigger}
				<ChevronDown className={styles.collapsibleChevron} size={16} />
			</CollapsibleTrigger>

			<CollapsibleContent className={styles.collapsibleContent}>{children}</CollapsibleContent>
		</CollapsibleRoot>
	);
};

export { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent };

export default Collapsible;
