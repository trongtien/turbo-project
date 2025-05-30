import { SidebarTrigger } from '@project/design-layout/main-ui';
import { Separator } from '@radix-ui/react-separator';
import type { PropsWithChildren } from 'react';

const HeaderWrapper = ({ children }: PropsWithChildren) => {
	return (
		<header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
			<div className="flex items-center gap-2 px-4 w-full">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mr-2 h-4" />
				{children}
			</div>
		</header>
	);
};

export default HeaderWrapper;
