import React, { forwardRef, useMemo } from 'react';
import styles from './Input.module.scss';

type InputCustomSize = 'sm' | 'md' | 'lg';
type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
	size?: InputCustomSize;
	type?: InputType;
	error?: boolean;
	errorMessage?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	clearable?: boolean;
	onClear?: () => void;
	wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			size = 'sm',
			type = 'text',
			error = false,
			errorMessage,
			leftIcon,
			rightIcon,
			clearable = false,
			onClear,
			className = '',
			wrapperClassName = '',
			value,
			onChange,
			...props
		},
		ref,
	) => {
		const inputClasses = useMemo(() => {
			return `
              ${styles.input}
              ${styles[`size-${size}`]}
              ${leftIcon ? styles.hasLeftIcon : ''}
              ${rightIcon ? styles.hasRightIcon : ''}
            `;
		}, [size, leftIcon, rightIcon]);

		const inputClassesError = useMemo(() => {
			if (error) {
				return styles.error;
			}
			return '';
		}, [error]);

		return (
			<div className={`${styles.inputContainer} ${wrapperClassName}`}>
				<div className={styles.inputWrapper}>
					{leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}

					<input
						ref={ref}
						type={type}
						className={`${inputClasses} ${inputClassesError} ${className}`}
						{...props}
					/>

					{rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
				</div>

				{error && errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
			</div>
		);
	},
);

Input.displayName = 'Input';

export default Input;
