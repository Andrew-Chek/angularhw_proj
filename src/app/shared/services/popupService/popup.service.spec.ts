import { TestBed } from '@angular/core/testing';

import { PopupService } from './popup.service';

describe('PopupService', () => {
  let service: PopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopupService]
    });
    service = TestBed.inject(PopupService);
  });

  describe('#setDefault', () => {
    it('should set all flags to false', () => {
      service.setDefault();
      service.state$.subscribe(value => {
        expect(value.openCreateBoard).toEqual(false)
        expect(value.openCreateTask).toEqual(false)
        expect(value.openDelete).toEqual(false)
        expect(value.openDeleteBoard).toEqual(false)
        expect(value.openDeleteTask).toEqual(false)
        expect(value.openEditBoard).toEqual(false)
        expect(value.openEditTask).toEqual(false)
      })
    })
  })

  describe('#setColor', () => {
    it('should set proper color to expected column', () => {
      service.setColor('#000000', 2);
      service.statusColors.subscribe(value => {
        expect(value.color3).toEqual('#000000')
      })
    })

    it('should set empty string as color to expected column', () => {
      service.setColor('', 1);
      service.statusColors.subscribe(value => {
        expect(value.color2).toEqual('')
      })
    })

    it('should cancel changes, if order is not correct', () => {
      service.setColor('', 5);
      const expectedValue = service.statusColors.getValue()
      service.statusColors.subscribe(value => {
        expect(value).toEqual(expectedValue)
      })
    })
  })

  describe('#openCreateBoardForm', () => {
    it('should close form, if it is opened', () => {
      service.openCreateBoard = true;
      service.openCreateBoardForm();
      service.state$.subscribe(value => {
        expect(value.openCreateBoard).toEqual(false)
        expect(service.openCreateBoard).toEqual(false);
      })
    })

    it('should open form, if it is closed', () => {
      service.openCreateBoard = false;
      service.openCreateBoardForm();
      service.state$.subscribe(value => {
        expect(value.openCreateBoard).toEqual(true)
        expect(service.openCreateBoard).toEqual(true);
      })
    })
  })

  describe('#openEditBoardForm', () => {
    it('should close form, if it is opened', () => {
      service.openEditBoard = true;
      service.openEditBoardForm();
      service.state$.subscribe(value => {
        expect(value.openEditBoard).toEqual(false)
        expect(service.openEditBoard).toEqual(false);
      })
    })

    it('should open form, if it is closed', () => {
      service.openEditBoard = false;
      service.openEditBoardForm();
      service.state$.subscribe(value => {
        expect(value.openEditBoard).toEqual(true)
        expect(service.openEditBoard).toEqual(true);
      })
    })
  })

  describe('#openDeleteBoardForm', () => {
    it('should close form, if it is opened', () => {
      service.openDeleteBoard = true;
      service.openDeleteBoardForm();
      service.state$.subscribe(value => {
        expect(value.openDeleteBoard).toEqual(false)
        expect(service.openDeleteBoard).toEqual(false);
      })
    })

    it('should open form, if it is closed', () => {
      service.openDeleteBoard = false;
      service.openDeleteBoardForm();
      service.state$.subscribe(value => {
        expect(value.openDeleteBoard).toEqual(true)
        expect(service.openDeleteBoard).toEqual(true);
      })
    })
  })

  describe('#openCreateTaskForm', () => {
    it('should close form, if it is opened', () => {
      service.openCreateTask = true;
      service.openCreateTaskForm();
      service.state$.subscribe(value => {
        expect(value.openCreateTask).toEqual(false)
        expect(service.openCreateTask).toEqual(false);
      })
    })

    it('should open form, if it is closed', () => {
      service.openCreateTask = false;
      service.openCreateTaskForm();
      service.state$.subscribe(value => {
        expect(value.openCreateTask).toEqual(true)
        expect(service.openCreateTask).toEqual(true);
      })
    })
  })

  describe('#openEditTaskForm', () => {
    it('should close form, if it is opened', () => {
      service.openEditTask = true;
      service.openEditTaskForm();
      service.state$.subscribe(value => {
        expect(value.openEditTask).toEqual(false)
        expect(service.openEditTask).toEqual(false);
      })
    })

    it('should open form, if it is closed', () => {
      service.openEditTask = false;
      service.openEditTaskForm();
      service.state$.subscribe(value => {
        expect(value.openEditTask).toEqual(true)
        expect(service.openEditTask).toEqual(true);
      })
    })
  })

  describe('#openDeleteTaskForm', () => {
    it('should close form, if it is opened', () => {
      service.openDeleteTask = true;
      service.openDeleteTaskForm();
      service.state$.subscribe(value => {
        expect(value.openDeleteTask).toEqual(false)
        expect(service.openDeleteTask).toEqual(false);
      })
    })

    it('should open form, if it is closed', () => {
      service.openDeleteTask = false;
      service.openDeleteTaskForm();
      service.state$.subscribe(value => {
        expect(value.openDeleteTask).toEqual(true)
        expect(service.openDeleteTask).toEqual(true);
      })
    })
  })

  describe('#closeDeleteForm', () => {
    it('should close delete board form', () => {
      service.openDeleteBoard = true;
      service.closeDeleteForm();
      service.state$.subscribe(value => {
        expect(value.openDeleteBoard).toEqual(false)
        expect(service.openDeleteBoard).toEqual(false);
      })
    })

    it('should close delete task form', () => {
      service.openDeleteTask = true;
      service.closeDeleteForm();
      service.state$.subscribe(value => {
        expect(value.openDeleteTask).toEqual(false)
        expect(service.openDeleteTask).toEqual(false);
      })
    })
  })

  describe('#setDragState', () => {
    it('should set drag true, if it is false', () => {
      service.isDraged = true;
      service.setDragState();
      service.state$.subscribe(value => {
        expect(value.isDraged).toEqual(false)
        expect(service.isDraged).toEqual(false);
      })
    })

    it('should set drag false, if it is true', () => {
      service.isDraged = false;
      service.setDragState();
      service.state$.subscribe(value => {
        expect(value.isDraged).toEqual(true)
        expect(service.isDraged).toEqual(true);
      })
    })
  })
});
