import useFormField from '@bds/design-layout/hooks/useFormField';
import { forwardRef, type HTMLAttributes } from 'react';
import style from './FormDescription.module.scss';

const FormDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
	({ className = '', ...props }, ref) => {
		const { formDescriptionId } = useFormField();

		return (
			<p
				ref={ref}
				id={formDescriptionId}
				className={`${style['form-description']} ${className}`}
				{...props}
			/>
		);
	},
);
FormDescription.displayName = 'FormDescription';

export default FormDescription;
