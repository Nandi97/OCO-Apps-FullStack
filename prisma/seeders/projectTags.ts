export function getProjectTags() {
	return [
		{
			id: 1,
			name: 'Todo/On-Hold',
			description: 'Project is set to be done or currently on hold.',
			colour: '#FFCC00',
		}, // Yellow
		{
			id: 2,
			name: 'Ongoing',
			description: 'Project is currently in progress.',
			colour: '#00CC99',
		}, // Green
		{
			id: 3,
			name: 'Ongoing',
			description: 'Project is actively being worked on.',
			colour: '#00CC99',
		}, // Green
		{
			id: 4,
			name: 'Complete',
			description: 'Project has been finished and all tasks are complete.',
			colour: '#3366FF',
		}, // Blue
		{
			id: 5,
			name: 'Overdue',
			description: 'Project has missed its deadline and is overdue.',
			colour: '#FF3333',
		}, // Red
	];
}
