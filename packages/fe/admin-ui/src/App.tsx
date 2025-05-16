import { Button } from '@bds/design-layout/components/Button';
import Input from '@bds/design-layout/components/Input';
import Label from '@bds/design-layout/components/Label';
import { Settings, User, LogOut } from 'lucide-react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@bds/design-layout/components/Card';
import Separator from '@bds/design-layout/components/Separator';

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@bds/design-layout/components/DropdownMenu';

function App() {
	return (
		<div className="test">
			Submit
			<br />
			<Label htmlFor="username" size="lg">
				Username
			</Label>
			<br />
			<Button>Test</Button>
			<Input size="sm" placeholder="config" />
			<Separator orientation="vertical" />
			<Card>
				<CardHeader>
					<CardTitle>Card Title</CardTitle>
					<CardDescription>Card description goes here</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Card content goes here. This can be any React node.</p>
				</CardContent>
				<CardFooter>
					<Button variant="outline">Cancel</Button>
					<Button>Submit</Button>
				</CardFooter>
			</Card>
			<br />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button>Open menu</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem icon={<User size={16} />}>Profile</DropdownMenuItem>
					<DropdownMenuItem icon={<Settings size={16} />}>Settings</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem icon={<LogOut size={16} />}>Log out</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export default App;
