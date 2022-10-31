import { AfterViewInit, Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, map, mergeMap, Observable, of, Subscription, switchMap, take, takeUntil } from 'rxjs';
import { AdminService } from 'src/app/features/admin/admin.service';
import { Task } from 'src/app/Task';

@Directive({
  selector: "[appDragAndDrop]",
})
export class DragAndDropDirective implements OnInit, OnDestroy, AfterViewInit {
  private element!: HTMLElement;
  private task$!: Observable<Task>

  private subscriptions: Subscription[] = [];

  constructor(
    private elementRef: ElementRef, private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement as HTMLElement;
  }

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement.children[0].children[0] as HTMLElement
    const id = element.getAttribute('id')
    if(id != null)
    {
      this.task$ = this.adminService.getTaskValue(id)
      this.initDrag();
    }
  }

  initDrag(): void {
    // 1
    const dragStart$ = fromEvent<MouseEvent>(this.element, "mousedown");
    const dragEnd$ = fromEvent<MouseEvent>(document, "mouseup")
    .pipe(
      switchMap(event => {
      console.log('hello from drag end')
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
      this.element.classList.remove('free-dragging');
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
        console.log('drag started')
        initialX = event.clientX - currentX;
        initialY = event.clientY - currentY;
        this.element.classList.add('free-dragging');
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
