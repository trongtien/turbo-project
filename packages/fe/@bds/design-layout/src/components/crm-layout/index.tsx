import { SidebarInset, SidebarProvider } from '@bds/design-layout/main-ui';
import { Toaster as SonnerToaster } from 'sonner';
import { Toaster } from '@bds/design-layout/ui/toaster';
import NavSidebar from '../nav-sidebar';
import HeaderWrapper from './header-wrapper';
import HeaderBreadcrumbList from './header-breadcrumb-list';
import type { PropsWithChildren } from 'react';

const CRMLayout = ({ children }: PropsWithChildren) => {
	return (
		<SidebarProvider>
			<NavSidebar />
			<SidebarInset>
				<HeaderWrapper>
					<HeaderBreadcrumbList />
				</HeaderWrapper>
				<div className="flex flex-1 flex-col gap-4 p-4">
					<SonnerToaster />
					{children}
					<Toaster />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default CRMLayout;
