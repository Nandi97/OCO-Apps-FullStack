import React, { useState } from 'react';
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
	const [isHovered, setIsHovered] = useState(false);

	const handleHover = () => {
		setIsHovered(!isHovered);
	};

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
			<div className="relative z-20 inline-block group">
				<button type="button" className={String(optBtn?.buttonClassName)}>
					{optBtn?.name}
					<Icon
						icon={String(optBtn.icon)}
						className={`${!optBtn.iconClassName ? '' : 'ml-2 -mr-1'} text-base`}
						aria-hidden="true"
					/>
				</button>
				<div className="absolute right-0 z-30 flex-col hidden w-48 p-1 text-xs transition-all duration-300 bg-white border divide-y rounded shadow-sm group-hover:inline-flex top-8 border-ocoblue-100 divide-ocoblue-100 shadow-ocoblue-100">
					{optionsList?.map((item, i) => (
						<React.Fragment key={`option-item-${i}`}>
							{!item.link ? (
								<button
									type="button"
									className="flex items-center w-full px-4 py-2 space-x-2 text-xs transition-all duration-300 rounded group text-ocoblue-700 hover:bg-ocoblue-600 hover:bg-opacity-20"
									onClick={() => handleClick(item)}
								>
									<Icon icon={String(item?.icon)} className="text-lg" />
									<span>{item?.name}</span>
								</button>
							) : (
								<Link
									href={item?.link}
									className="flex items-center w-full px-4 py-2 space-x-2 text-xs transition-all duration-300 rounded group text-ocoblue-700 hover:bg-ocoblue-600 hover:bg-opacity-20"
								>
									<Icon icon={String(item?.icon)} className="text-lg" />
									<span>{item?.name}</span>
								</Link>
							)}
						</React.Fragment>
					))}
				</div>
			</div>
		</div>
	);
}
