import React from 'react';
import styles from './CardHeader.module.scss';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	withBorder?: boolean;
	className?: string;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
	({ withBorder = false, className = '', ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={`
          ${styles.header}
          ${withBorder ? styles.withBorder : ''}
          ${className}
        `}
				{...props}
			/>
		);
	},
);

CardHeader.displayName = 'CardHeader';

export default CardHeader;
