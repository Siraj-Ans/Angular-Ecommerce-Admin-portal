import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[NavLinksDirective]',
})
export class NavLinksDirective implements OnInit {
  constructor(private renderer: Renderer2, private element: ElementRef) {}

  ngOnInit(): void {
    this.renderer.listen(this.element.nativeElement, 'click', (event) => {
      let parentNode = this.renderer.parentNode(this.element.nativeElement);
      parentNode = this.renderer.parentNode(parentNode);
      parentNode = this.renderer.parentNode(parentNode);
      parentNode = this.renderer.parentNode(parentNode);
      let adminPanel = this.renderer.parentNode(parentNode);

      //   this.renderer.setStyle(adminPanel, 'display', 'none');
    });
  }
}
