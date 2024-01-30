'use client';

import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

import { labels } from './data/data';
import { staffSchema } from './data/schema';
import { Icon } from '@iconify/react/dist/iconify.js';

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function DataTableRowActions<TData>() {
	// const task = staffSchema.parse(row.original);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex h-8 w-8 p-0 data-[state=open]:bg-muted hover:bg-secondary-500 hover:text-secondary-50"
				>
					<Icon icon="radix-icons:dots-horizontal" className="h-4 w-4" />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px] bg-secondary-50">
				<DropdownMenuItem className="hover:bg-secondary-500 hover:text-secondary-50">
					Edit
				</DropdownMenuItem>

				<DropdownMenuItem
					className="hover:bg-secondary-500 hover:text-secondary-50"
					onClick={() => alert('Delete')}
				>
					Delete
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
