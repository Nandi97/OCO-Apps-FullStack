import React from 'react';
import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Project, Id } from '@/components/types/master';

interface Props {
	task: Project;
	deleteTask: (id: Id) => void;
	updateTask: (id: Id, content: string) => void;
}

const TaskCard = () => {
	return <div>TaskCard</div>;
};

export default TaskCard;
