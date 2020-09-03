import {NgModule} from '@angular/core';
import {TodoResolver} from './todo.resolver';

@NgModule({
    providers: [TodoResolver],
})
export class TodoModule {}
