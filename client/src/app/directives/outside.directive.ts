import {Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2} from '@angular/core';

@Directive({selector: '[outside]'})
export class OutsideDirective {

    @Output('outside')
    readonly outside = new EventEmitter<any>();

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
    ) {}

    @HostListener('document:pointerdown')
    private onPointerDown() {
        console.log('click');
        const listener = this.renderer.listen('document', 'pointerup', event => {
            const element = this.elementRef.nativeElement;
            const inside = event.target === element || element.contains(event.target);
            if (!inside) setTimeout(() => this.outside.emit(event), 50);
            listener();
        })
    }
}
