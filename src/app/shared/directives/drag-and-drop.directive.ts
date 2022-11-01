import { AfterViewInit, Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, map, mergeMap, Observable, of, Subscription, switchMap, take, takeUntil } from 'rxjs';
import { AdminService } from 'src/app/features/admin/admin.service';
import { Task } from 'src/app/Task';
import { PopupService } from '../services/popupService/popup.service';

@Directive({
  selector: "[appDragAndDrop]",
})
export class DragAndDropDirective implements OnInit, OnDestroy, AfterViewInit {
  private element!: HTMLElement;
  private task$!: Observable<Task>

  private subscriptions: Subscription[] = [];

  constructor(private elementRef: ElementRef, 
    private adminService: AdminService, private popupService: PopupService) {}

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement as HTMLElement;
  }

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement as HTMLElement
    const id = element.getAttribute('data-task-id')!
    const name = element.getAttribute('data-task-name')!
    const description = element.getAttribute('data-task-description')!
    const status = element.getAttribute('data-task-status')!
    const assigned_to = element.getAttribute('data-task-assigned_to')!
    const created_date = element.getAttribute('data-task-created_date')!
    const board_id = element.getAttribute('data-task-board_id')!
    const isArchived = element.getAttribute('data-task-archived')! == 'true'
    const task: Task = {_id: id, name, description, status, assigned_to, board_id, created_date, isArchived}
    this.task$ = of(task)
    this.initDrag();
  }

  initDrag(): void {
    // 1
    const dragIcon = this.element.children[0].children[0].children[1].children[0].children[0];
    const dragStart$ = fromEvent<MouseEvent>(dragIcon, "mousedown");
    const dragEnd$ = fromEvent<MouseEvent>(document, "mouseup")
    .pipe(
      switchMap(event => {
        if(event.clientX > todoWidth.leftX && event.clientX < todoWidth.rightX)
        {
          this.task$.subscribe(task => {
            task.status = 'To do'
            this.adminService.updateTask({...task});
          })
        }
        else if(event.clientX > inProgressWidth.leftX && event.clientX < inProgressWidth.rightX)
        {
          this.task$.subscribe(task => {
            task.status = 'In progress'
            this.adminService.updateTask({...task});
          })
        }
        else if(event.clientX > doneWidth.leftX && event.clientX < doneWidth.rightX)
        {
          this.task$.subscribe(task => {
            task.status = 'Done'
            this.adminService.updateTask({...task});
          })
        }
        initialX = 0;
        initialY = 0;
        this.popupService.setDragState();
        this.element.children[0].classList.remove('dragItem');
        return of(event);
    }))
    const drag$ = fromEvent<MouseEvent>(document, "mousemove").pipe(
      takeUntil(dragEnd$)
    );

    // 2
    let initialX: number,
      initialY: number,
      currentX = 0,
      currentY = 0;

    const blockWidth = window.innerWidth / 3.85 * 3;
    const marginToBlock = blockWidth / 100 * 5 + 10;
    const leftBlocksMargin = window.innerWidth / 3.85 * 0.85;
    const statusBoardWidth = blockWidth * 0.3;

    const todoWidth = {leftX: leftBlocksMargin + marginToBlock, rightX: leftBlocksMargin + marginToBlock + statusBoardWidth};
    const inProgressWidth = {leftX: todoWidth.rightX, rightX: todoWidth.rightX + statusBoardWidth};
    const doneWidth = {leftX: inProgressWidth.rightX, rightX: inProgressWidth.rightX + statusBoardWidth};

    // 3
    const dragStartSub = dragStart$.pipe(
      switchMap(event => {
        this.popupService.setDragState();
        initialX = event.clientX - currentX;
        initialY = event.clientY - currentY;
        this.element.children[0].classList.add('dragItem');
        return drag$;
      }))
    .subscribe((event: MouseEvent) => {
      event.preventDefault();

      currentX = event.clientX - initialX;
      currentY = event.clientY - initialY;

      this.element.style.transform =
        "translate3d(" + currentX + "px, " + currentY + "px, 0)";
    });

    // 6
    this.subscriptions.push.apply(this.subscriptions, [
      dragStartSub,
    ]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s?.unsubscribe());
  }
}
