import { forwardRef } from 'react';
import style from './FormItem.module.scss';
import Label from '../Label';
import useFormField from '@bds/design-layout/hooks/useFormField';
import type { LabelProps, LabelRef } from '../Label/Label';

const FormLabel = forwardRef<LabelRef, LabelProps>(({ className, ...props }, ref) => {
	const { error, formItemId } = useFormField();

	return (
		<Label
			ref={ref}
			className={` ${error && style['form-label--error']} ${className || ''}`}
			htmlFor={formItemId}
			{...props}
		/>
	);
});
FormLabel.displayName = 'FormLabel';

export default FormLabel;
