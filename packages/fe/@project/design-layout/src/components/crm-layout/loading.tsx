import { useCrmLayout } from '@project/design-layout/hooks';
import { type FC, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

type LoadingAppProps = PropsWithChildren & {
	size?: number;
	color?: string;
};

const LoadingApp: FC<LoadingAppProps> = ({
	children,
	size = 36,
	color = 'bg-blue-500',
}: LoadingAppProps) => {
	const { loading } = useCrmLayout();
	const gap = size / 3;

	if (!loading) return null;

	return createPortal(
		<section className="w-screen h-screen absolute inset-0 flex align-middle justify-center items-center overflow-hidden z-[9999] bg-white">
			<div
				className="relative flex align-middle justify-center overflow-hidden z-[99999]"
				style={{ width: `${size}px`, height: `${size}px`, gap: `${gap}px` }}
			>
				{[0, 1, 2].map((i) => (
					<div
						key={i}
						className={`flex-1 ${color} rounded-sm animate-bars-loader`}
						style={{ animationDelay: `${-240 + i * 120}ms` }}
					/>
				))}
				{children}
			</div>
		</section>,
		document.body,
	);
};

export default LoadingApp;
