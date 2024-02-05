import { cn } from '@/lib/utils';
import * as React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type Option = {
	label: React.ReactNode;
	value: string | number | string[];
};

interface InputProps {
	name?: string;
	label?: string;
	className?: string;
	options: Option[];
	defaultValue?: string;
	defaultText?: string;
	error?: FieldError | undefined;
	registration: Partial<UseFormRegisterReturn>;
	disabled?: boolean;
}

export default function SelectInput({
	options,
	name,
	label,
	className,
	defaultText,
	error,
	defaultValue,
	registration,
	disabled,
}: InputProps) {
	return (
		<div className={cn(className)}>
			<label className="form-control w-full max-w-xs ">
				<div className="block text-sm font-medium text-secondary-700">
					<span className="label-text">{label}</span>
				</div>
				<select
					// placeholder={placeholder}
					name={name}
					defaultValue={defaultValue}
					{...registration}
					className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-secondary-500 block p-2.5 h-8 px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
					disabled={disabled}
				>
					{defaultText && defaultText?.length > 0 && (
						<option
							selected
							disabled
							value=""
							className="text-opacity-50 text-secondary-700"
						>
							--{defaultText}--
						</option>
					)}
					{options?.map(({ label, value }) => (
						<option key={label?.toString()} value={value}>
							{label}
						</option>
					))}
				</select>
				{error?.message && (
					<div role="alert" aria-label={error.message} className="text-red-500 text-xs">
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
