import { ChevronRight, type LucideIcon } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem } from '@bds/design-layout/components/Sidebar';
import styles from './NavMain.module.scss';
import SidebarMenuButton from '@bds/design-layout/components/Sidebar/SidebarMenuButton';
import {
	CollapsibleRoot,
	CollapsibleTrigger,
} from '@bds/design-layout/components/Collapsible/Collapsible';

interface SideMenuItem {
	title: string;
	url: string;
}

interface SideMenu {
	title: string;
	url?: string;
	icon: LucideIcon;
	isActive?: boolean;
	items: SideMenuItem[];
}

export type { SideMenuItem, SideMenu };

export default function NavMain({ items }: { items: SideMenu[] }) {
	return (
		<SidebarMenu className={styles.sidebarMenu}>
			{items.map((item) => (
				<CollapsibleRoot
					key={item.title}
					asChild
					defaultOpen={item.isActive}
					className={styles.collapsible}
				>
					<SidebarMenuItem className={styles.sidebarMenuItem}>
						<CollapsibleTrigger asChild>
							<SidebarMenuButton tooltip={item.title} className={styles.sidebarMenuButton}>
								{item.icon && <item.icon className={styles.menuIcon} />}
								<span className={styles.menuTitle}>{item.title}</span>
								<ChevronRight className={styles.chevronIcon} />
							</SidebarMenuButton>
						</CollapsibleTrigger>
						{/* <CollapsibleContent className={styles.collapsibleContent}>
							<SidebarMenuSub className={styles.sidebarMenuSub}>
								{item.items?.map((subItem) => (
									<SidebarMenuSubItem key={subItem.title} className={styles.sidebarMenuSubItem}>
										<SidebarMenuSubButton asChild className={styles.sidebarMenuSubButton}>
											<a href={subItem.url} className={styles.subMenuLink}>
												<span className={styles.subMenuTitle}>{subItem.title}</span>
											</a>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								))}
							</SidebarMenuSub>
						</CollapsibleContent> */}
					</SidebarMenuItem>
				</CollapsibleRoot>
			))}
		</SidebarMenu>
	);
}
