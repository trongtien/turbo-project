import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './Sidebar.module.scss';

interface SidebarProps {
	children: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	defaultOpen?: boolean;
}

export const SidebarContext = React.createContext<{
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
} | null>(null);

const Sidebar = ({ children, open, onOpenChange, defaultOpen = false }: SidebarProps) => {
	const [isInternalOpen, setIsInternalOpen] = React.useState(defaultOpen);
	const isControlled = open !== undefined;
	const isOpen = isControlled ? open : isInternalOpen;

	const setIsOpen = (open: boolean) => {
		if (!isControlled) {
			setIsInternalOpen(open);
		}
		onOpenChange?.(open);
	};

	return (
		<SidebarContext.Provider value={{ isOpen, setIsOpen }}>
			<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
				{children}
			</Dialog.Root>
		</SidebarContext.Provider>
	);
};

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		return (
			<Dialog.Portal>
				<Dialog.Overlay className={styles.sidebarOverlay} />
				<Dialog.Content ref={ref} className={`${styles.sidebar} ${className}`} {...props} />
			</Dialog.Portal>
		);
	},
);
SidebarContent.displayName = 'SidebarContent';


export { Sidebar, SidebarContent };
