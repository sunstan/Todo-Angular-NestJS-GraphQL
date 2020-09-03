import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {TodosState} from '@core/store/todos/todos.state';
import {GetMoreTodos, GetTodos} from '@core/store/todos/todos.actions';
import {Todo} from '@core/todo/todo.entity';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {

    @Select(TodosState.total)
    readonly total$: Observable<number>

    @Select(TodosState.hasMore)
    readonly hasMore$: Observable<boolean>

    @Select(TodosState.dones)
    readonly dones$: Observable<Todo[]>

    @Select(TodosState.undones)
    readonly undones$: Observable<Todo[]>

    @Select(TodosState.itemsLength)
    readonly itemsLength$: Observable<number>

    completed = true;

    constructor(private store: Store) {
        store.dispatch(new GetTodos({take: 2}))
    }

    getMore(): void {
        const itemsLength = this.store.selectSnapshot(TodosState.itemsLength);
        this.store.dispatch(new GetMoreTodos({take: 2, skip: itemsLength}));
    }
}
