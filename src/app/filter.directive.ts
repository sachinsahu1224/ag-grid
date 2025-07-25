import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFilter]',
  standalone: true
})
export class FilterDirective {

  constructor(private elm:ElementRef) {
    console.log("hello");
    
    //this.elm.nativeElement.style.color="red";
    this.elm.nativeElement.style.color = 'blue';
   }

   @HostListener('mouseleave') onMouseLeave() {
    this.elm.nativeElement.style.backgroundColor = 'red';
}

}
