'use client';
import { useQuery } from '@tanstack/react-query';
import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';
import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import React from 'react';
import { fetchAllProjectTags } from '@/services/api-calls/projects';

const Dashboard = () => {
	const { data: defaultColumns } = useQuery({
		queryFn: fetchAllProjectTags,
		queryKey: ['default-columns'],
	});

	const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
		id: '',
	});

	return (
		<>
			<div className="flex flex-col gap-2 bg-white">
				<h1 className="text-accent-700 text-lg font-extralight">Projects</h1>
				<div className="inline-flex items-center space-x-2"></div>
			</div>
			<div className="flex w-full gap-4">
				{defaultColumns?.map((item: any) => (
					<div
						key={item?.id}
						className="w-full rounded-md border-2 border-dashed border-primary-400"
					>
						<div {...attributes} {...listeners} className="bg-primary-50 p-4">
							<h1 className="w-full text-center font-semibold">{item?.name}</h1>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default Dashboard;
