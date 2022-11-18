import { Task } from "src/app/shared/interfaces/Task";

export const task: Task = {
	_id: '2',
	name: 'task2',
	description: 'to do it now',
	status: 'In progress',
	assigned_to: '1',
	board_id: '1',
	created_date: '',
	isArchived: false,
	comments: [
		{_id: '1', title: 'new title', message: 'new message', created_date: ''},
		{_id: '2', title: 'tested title', message: 'tested message', created_date: ''}
	]
}