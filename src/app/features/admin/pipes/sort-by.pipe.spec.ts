import { SortByPipe } from './sort-by.pipe';
import { tasks } from '../../../shared/testingData/tasksMock';
import { sortedTasks } from '../../../shared/testingData/pipeData/sortedTasksMock';
import { descNameTasks } from 'src/app/shared/testingData/pipeData/tasksByDescName';
import { ascDropdownTasks } from 'src/app/shared/testingData/pipeData/ascDropdownTasks';
import { descDropdownTasks } from 'src/app/shared/testingData/pipeData/descDropdownTasks';
import { boards } from 'src/app/shared/testingData/boardsMock';
import { descDropdownBoards } from 'src/app/shared/testingData/pipeData/descDropdownBoards';

describe('SortByPipe', () => {
  let sortPipe: SortByPipe;
  let copiedTasks = [...tasks];
  let copiedBoards = [...boards]
  beforeEach(() => {
    sortPipe = new SortByPipe();
    copiedTasks = [...tasks];
    copiedBoards = [...boards]
  })

  it('transform data of tasks as expected by asc name', () => {
    const sortedTasksByPipe = sortPipe.transform(copiedTasks, 'asc', 'name');
    expect(sortedTasksByPipe).toEqual(sortedTasks);
  })

  it('transform data of tasks as expected by desc name', () => {
    const sortedTasksByPipe = sortPipe.transform(copiedTasks, 'desc', 'name');
    expect(sortedTasksByPipe).toEqual(descNameTasks);
  })

  it('transform data of tasks as expected by asc dropdown', () => {
    const sortedTasksByPipe = sortPipe.transform(copiedTasks, 'asc', 'created_date');
    expect(sortedTasksByPipe).toEqual(ascDropdownTasks);
  })

  it('transform data of tasks as expected by desc dropdown', () => {
    const sortedTasksByPipe = sortPipe.transform(copiedTasks, 'desc', 'created_date');
    expect(sortedTasksByPipe).toEqual(descDropdownTasks);
  })

  it('transform data of boards as expected by desc dropdown', () => {
    const sortedBoardsByPipe = sortPipe.transform(copiedBoards, 'desc', 'created_date');
    expect(sortedBoardsByPipe).toEqual(descDropdownBoards);
  })

  it('transform empty data', () => {
    const sortedTasksByPipe = sortPipe.transform([], 'desc', 'created_date');
    expect(sortedTasksByPipe).toEqual([]);
  })
});
