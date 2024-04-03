import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

import Link from 'next/link';

interface OptionItem {
	icon?: string;
	name?: string;
	link?: string;
	action?: () => void;
}
interface OptionButton {
	icon?: string;
	name?: string;
	buttonClassName?: string;
	iconClassName?: string;
}

interface SearchInputProps {
	optBtn: OptionButton;
	optionsList: OptionItem[];
}

export default function OptDropdown({ optBtn, optionsList }: SearchInputProps) {
	const handleClick = (item: OptionItem) => {
		if (item) {
			if (item.action) {
				item.action();
			} else if (item.link) {
				window.location.href = item.link;
			}
		}
	};
	return (
		<div>
			<Menu as="div" className="group relative z-20 inline-block">
				<div>
					<Menu.Button className={String(optBtn?.buttonClassName)}>
						{optBtn?.name}
						<Icon
							icon={String(optBtn.icon)}
							className={`${!optBtn.iconClassName ? '' : '-mr-1 ml-2'} text-base`}
							aria-hidden="true"
						/>
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-secondary-400 rounded-md bg-primary-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="px-1 py-1 ">
							{optionsList?.map((item, i) => (
								<Menu.Item key={`option-item-${i}`}>
									{!item.link ? (
										<button
											type="button"
											className="group flex w-full items-center space-x-2 rounded px-4 py-2 text-xs text-secondary-700 transition-all duration-300 hover:bg-secondary-600 hover:bg-opacity-20"
											onClick={() => handleClick(item)}
										>
											<Icon icon={String(item?.icon)} className="text-lg" />
											<span>{item?.name}</span>
										</button>
									) : (
										<Link
											href={item?.link}
											className="group flex w-full items-center space-x-2 rounded px-4 py-2 text-xs text-secondary-700 transition-all duration-300 hover:bg-secondary-600 hover:bg-opacity-20"
										>
											<Icon icon={String(item?.icon)} className="text-lg" />
											<span>{item?.name}</span>
										</Link>
									)}
								</Menu.Item>
							))}
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
}
