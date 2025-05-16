import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import styles from './Label.module.scss';

type LabelSize = 'sm' | 'md' | 'lg';

interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
	required?: boolean;
	disabled?: boolean;
	asChild?: boolean;
	htmlFor?: string;
	className?: string;
	size?: LabelSize;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
	(
		{ required = false, disabled = false, asChild = false, className = '', size = 'lg', ...props },
		ref,
	) => {
		const Comp = asChild ? Slot : LabelPrimitive.Root;

		return (
			<Comp
				ref={ref}
				className={`${styles.label} ${styles[`size-${size}`]} ${required ? styles.required : ''} ${disabled ? styles.disabled : ''}${className}`}
				{...props}
			/>
		);
	},
);

Label.displayName = 'Label';

export default Label;
