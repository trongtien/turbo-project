import React from 'react';
import styles from './Card.module.scss';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  clickable?: boolean;
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ asChild = false, clickable = false, className = '', ...props }, ref) => {
    const Comp = asChild ? 'div' : 'article';
    
    return (
      <Comp
        ref={ref}
        className={`
          ${styles.card}
          ${clickable ? styles.clickable : ''}
          ${className}
        `}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export default Card;