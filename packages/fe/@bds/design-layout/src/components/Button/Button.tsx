import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import styles from './Button.module.scss';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

type ButtonSize = 'default' | 'sm' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	isLoading?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	/**
	 * Nếu true, button sẽ render như thẻ span để có thể chứa trong các thẻ khác
	 * @default false
	 */
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = 'default',
			size = 'default',
			className = '',
			children,
			isLoading = false,
			leftIcon,
			rightIcon,
			asChild = false,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button';

		const buttonClasses = React.useMemo(() => {
			return `${styles.button} ${styles[`variant-${variant}`]} ${styles[`size-${size}`]} ${className}`;
		}, [variant, size]);

		const content = isLoading ? (
			<span className={styles.spinner} aria-hidden="true" />
		) : (
			<>
				{leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
				{children}
				{rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
			</>
		);

		return (
			<Comp ref={ref} className={buttonClasses} disabled={isLoading || props.disabled} {...props}>
				{content}
			</Comp>
		);
	},
);

Button.displayName = 'Button';

export default Button;
