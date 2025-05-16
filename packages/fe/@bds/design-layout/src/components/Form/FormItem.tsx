import { FormItemContext } from '@bds/design-layout/hooks/useFormField';
import { forwardRef, useId, type HTMLAttributes } from 'react';

const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const id = useId();

		return (
			<FormItemContext.Provider value={{ id }}>
				<div ref={ref} className={className} style={{ marginBottom: '0.5rem' }} {...props} />
			</FormItemContext.Provider>
		);
	},
);
FormItem.displayName = 'FormItem';

export default FormItem;
