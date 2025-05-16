import useFormField from '@bds/design-layout/hooks/useFormField';
import { Slot } from '@radix-ui/react-slot';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';

const FormControl = forwardRef<ElementRef<typeof Slot>, ComponentPropsWithoutRef<typeof Slot>>(
	({ ...props }, ref) => {
		const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

		return (
			<Slot
				ref={ref}
				id={formItemId}
				aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
				aria-invalid={!!error}
				{...props}
			/>
		);
	},
);
FormControl.displayName = 'FormControl';

export default FormControl;
