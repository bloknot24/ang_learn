import { Directive, TemplateRef, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIfnot]'
})
export class IfnotDirective {

  @Input('appIfnot') set ifNot(condition: boolean) {
      if (!condition) {
          // component
          this.viewContainer.createEmbeddedView(this.templateRef)
      } else {
          // close
          this.viewContainer.clear()
      }
  }

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) { }

}
