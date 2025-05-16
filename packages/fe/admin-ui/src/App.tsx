import { Button } from '@bds/design-layout/components/Button';
import Input from '@bds/design-layout/components/Input';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@bds/design-layout/components/Card';

function App() {
	return (
		<div className="test">
			Submit
			<br />
			<Button>Test</Button>
			<Input size="sm" placeholder="config" />
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
		</div>
	);
}

export default App;
