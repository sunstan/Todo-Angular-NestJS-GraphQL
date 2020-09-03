import {NgModule} from '@angular/core';
import {OutsideDirective} from './outside.directive';

const directives = [
    OutsideDirective,
];

@NgModule({
    declarations: directives,
    exports: directives,
})
export class DirectivesModule {}
