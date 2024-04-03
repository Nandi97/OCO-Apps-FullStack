import React from 'react';
import { cn } from '@/lib/utils';

import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
	label?: string;
	className?: string;
	placeholder?: string;
	type?: 'text' | 'email' | 'password' | 'number' | 'date';
	error?: FieldError | undefined;
	registration: Partial<UseFormRegisterReturn>;
	disabled?: boolean;
}

export default function TextInput({
	label,
	type = 'text',
	className,
	placeholder,
	error,
	registration,
	disabled,
}: InputProps) {
	return (
		<div className={cn(className)}>
			<label className="form-control w-full max-w-xs ">
				<div className="block text-sm font-medium text-secondary-700">
					<span className="label-text">{label}</span>
				</div>
				<input
					type={type}
					placeholder={placeholder}
					{...registration}
					className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
					disabled={disabled}
				/>
				{error?.message && (
					<div role="alert" aria-label={error.message} className="text-xs text-red-500">
						<span className="px-2">
							<sup>*</sup>
							{error.message}
						</span>
					</div>
				)}
			</label>
		</div>
	);
}
