import React from 'react';
import styles from './CardHeader.module.scss';

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={`
          ${styles.description}
          ${className}
        `}
        {...props}
      />
    );
  }
);

CardDescription.displayName = 'CardDescription';

export default CardDescription;