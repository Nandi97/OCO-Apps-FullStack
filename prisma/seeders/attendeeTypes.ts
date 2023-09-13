export function getAttendanceTypes() {
	return [
		{ name: 'present', description: 'these are present participants in the meeting' },
		{
			name: 'absentWithApology',
			description: 'these are staff absent for the meeting but apologized',
		},
		{
			name: 'absentWithoutApology',
			description: 'these are staff absent for the meeting but never apologized',
		},
		{
			name: 'chairPerson',
			description: 'this is the staff member that was appointed as chair of the meeting',
		},
		{
			name: 'scribe',
			description: 'this is the staff member that was appointed as scribe of the meeting',
		},
	];
}
