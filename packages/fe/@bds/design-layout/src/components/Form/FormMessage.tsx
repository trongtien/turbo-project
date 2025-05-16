import useFormField from '@bds/design-layout/hooks/useFormField';
import style from './FormMessage.module.scss';
import { forwardRef, type HTMLAttributes } from 'react';

const FormMessage = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
	({ className = '', children, ...props }, ref) => {
		const { error, formMessageId } = useFormField();
		const body = error ? String(error?.message ?? '') : children;

		if (!body) {
			return null;
		}

		return (
			<p
				ref={ref}
				id={formMessageId}
				className={`${style['form-message']} ${className}`}
				{...props}
			>
				{body}
			</p>
		);
	},
);
FormMessage.displayName = 'FormMessage';

export default FormMessage;
