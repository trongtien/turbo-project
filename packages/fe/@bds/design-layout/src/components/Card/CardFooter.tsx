import React from 'react';
import styles from './CardFooter.module.scss';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	withBorder?: boolean;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
	({ className = '', withBorder = false, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={`
          ${styles.footer}
          ${withBorder ? styles.withBorder : ''}
          ${className}
        `}
				{...props}
			/>
		);
	},
);

CardFooter.displayName = 'CardFooter';

export default CardFooter;
