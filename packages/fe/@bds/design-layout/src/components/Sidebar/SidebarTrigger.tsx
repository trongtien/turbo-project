import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { PanelLeft } from 'lucide-react';

interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean;
}

const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
	({ asChild = false, children, ...props }, ref) => {
		const Comp = asChild ? React.Fragment : Dialog.Trigger;

		return (
			<Comp asChild={asChild}>
				{asChild ? (
					children
				) : (
					<button ref={ref} aria-label="Toggle sidebar" {...props}>
						<PanelLeft />
						{children}
					</button>
				)}
			</Comp>
		);
	},
);
SidebarTrigger.displayName = 'SidebarTrigger';

export default SidebarTrigger;
