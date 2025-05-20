import { SidebarInset, SidebarProvider } from '@project/design-layout/main-ui';
import NavSidebar from '../crm-nav-sidebar';
import HeaderWrapper from './header-wrapper';
import HeaderBreadcrumbList from './header-breadcrumb-list';
import type { PropsWithChildren } from 'react';
import { useIsMobile } from '@project/design-layout/hooks/useIsMobile';

const CRMLayout = ({ children }: PropsWithChildren) => {
	const isMobile = useIsMobile();

	return (
		<SidebarProvider>
			<NavSidebar />
			<SidebarInset>
				<HeaderWrapper>{isMobile ? null : <HeaderBreadcrumbList />}</HeaderWrapper>
				<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default CRMLayout;
