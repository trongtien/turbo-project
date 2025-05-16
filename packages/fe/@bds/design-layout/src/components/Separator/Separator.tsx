import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import styles from './Separator.module.scss';

type SeparatorOrientation = 'horizontal' | 'vertical';
type SeparatorSize = 'default' | 'sm' | 'lg';

interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
	/**
	 * Orientation of the separator
	 * @default 'horizontal'
	 */
	orientation?: SeparatorOrientation;
	/**
	 * Size variant of the separator
	 * @default 'default'
	 */
	size?: SeparatorSize;
	/**
	 * Whether the separator is purely decorative
	 * @default false
	 */
	decorative?: boolean;
	/**
	 * Additional class name
	 */
	className?: string;
}

const Separator = React.forwardRef<
	React.ElementRef<typeof SeparatorPrimitive.Root>,
	SeparatorProps
>(
	(
		{ className = '', orientation = 'horizontal', decorative = false, size = 'default', ...props },
		ref,
	) => {
		return (
			<SeparatorPrimitive.Root
				ref={ref}
				decorative={decorative}
				orientation={orientation}
				className={`
          ${styles.separator}
          ${size !== 'default' ? styles[`size-${size}`] : ''}
          ${decorative ? styles.decorative : ''}
          ${className}
        `}
				{...props}
			/>
		);
	},
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export default Separator;
