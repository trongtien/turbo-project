import React from 'react';
import styles from './CardContent.module.scss';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
	({ className = '', ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={`
          ${styles.content}
          ${className}
        `}
				{...props}
			/>
		);
	},
);

CardContent.displayName = 'CardContent';

export default CardContent;
