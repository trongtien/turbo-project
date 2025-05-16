import React from 'react';
import styles from './CardHeader.module.scss';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	className?: string;
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
	({ as: Tag = 'h3', className = '', ...props }, ref) => {
		return (
			<Tag
				ref={ref}
				className={`
          ${styles.title}
          ${className}
        `}
				{...props}
			/>
		);
	},
);

CardTitle.displayName = 'CardTitle';

export default CardTitle;
