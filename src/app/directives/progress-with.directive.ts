import { ChangeDetectorRef, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appProgressWith]'
})
export class ProgressWithDirective {
  @Input() appProgressWith: number = 0;
  constructor(private el: ElementRef, private renderer: Renderer2,private cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.updateWith();
  }
  private updateWith() {
    const percentage = Math.min(100, Math.max(0, this.appProgressWith));
    this.renderer.setStyle(this.el.nativeElement, 'width', percentage + '%');
    this.cd.detectChanges();
  }
}
