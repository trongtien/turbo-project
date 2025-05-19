import { useContext } from 'react';
import { SidebarContext } from '@bds/design-layout/ui/sidebar';

const useSidebar = () => {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error('useSidebar must be used within a Sidebar');
	}
	return context;
};

export default useSidebar;
