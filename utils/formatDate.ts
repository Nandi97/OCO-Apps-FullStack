import { format, parseISO } from 'date-fns';

export function formatDate(dateTime: string, formatString = 'yyyy-MM-dd'): string {
	const dateObject = parseISO(dateTime);
	return format(dateObject, formatString);
}

export function formatTime(dateTime: string, formatString = 'HH:mm:ss'): string {
	const dateObject = parseISO(dateTime);
	return format(dateObject, formatString);
}
