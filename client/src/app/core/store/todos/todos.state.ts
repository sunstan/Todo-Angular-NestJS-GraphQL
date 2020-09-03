import defaults from './todos.defaults';
import {Injectable} from '@angular/core';
import * as actions from './todos.actions';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {TodoResolver} from '@core/todo/todo.resolver';
import {TodosOutput} from '@core/todo/outputs/todos.output';
import {TodosModel} from '@core/store/todos/todos.model';
import {Todo} from '@core/todo/todo.entity';
import {tap} from 'rxjs/operators';

@Injectable()
@State<TodosModel>({name: 'todos', defaults})
export class TodosState {

    @Selector()
    static total(state: TodosModel): number {
        return state.total;
    }

    @Selector()
    static hasMore(state: TodosModel): boolean {
        return state.hasMore;
    }

    @Selector()
    static dones(state: TodosModel): Todo[] {
        return state.items.filter(i => i.doneAt);
    }

    @Selector()
    static undones(state: TodosModel): Todo[] {
        return state.items.filter(i => !i.doneAt);
    }

    @Selector()
    static itemsLength(state: TodosModel): number {
        return state.items.length;
    }

    constructor(private todoResolver: TodoResolver) {}

    @Action(actions.GetTodos)
    get(ctx: StateContext<TodosModel>, {input}: actions.GetTodos) {
        return this.todoResolver.todos(input).pipe(
            tap((output: TodosOutput) => ctx.setState(output))
        );
    }

    @Action(actions.GetMoreTodos)
    getMore(ctx: StateContext<TodosModel>, {input}: actions.GetMoreTodos) {
        const state = ctx.getState();
        if (state.total === null) return;

        return this.todoResolver.todos(input).pipe(
            tap((output: TodosOutput) => ctx.patchState({
                ...output,
                items: [...state.items, ...output.items]
            }))
        );
    }

    @Action(actions.CreateTodo)
    create(ctx: StateContext<TodosModel>, {input}: actions.CreateTodo) {
        const state = ctx.getState();
        return this.todoResolver.createTodo(input).pipe(
            tap((todo: Todo) => ctx.patchState({
                total: state.total + 1,
                items: [todo, ...state.items],
            }))
        );
    }

    @Action(actions.UpdateTodo)
    update(ctx: StateContext<TodosModel>, {ID, input}: actions.UpdateTodo) {
        const state = ctx.getState();
        return this.todoResolver.updateTodo(ID, input).pipe(
            tap((todo: Todo) => ctx.patchState({
                items: state.items.map(i => i.ID === ID ? {...i, ...todo} : i),
            }))
        );
    }

    @Action(actions.DoneTodo)
    done(ctx: StateContext<TodosModel>, {ID}: actions.DoneTodo) {
        const state = ctx.getState();
        return this.todoResolver.doneTodo(ID).pipe(
            tap((todo: Todo) => ctx.patchState({
                items: state.items.map(i => i.ID === ID ? {...i, ...todo} : i),
            }))
        );
    }

    @Action(actions.UndoneTodo)
    undone(ctx: StateContext<TodosModel>, {ID}: actions.UndoneTodo) {
        const state = ctx.getState();
        return this.todoResolver.undoneTodo(ID).pipe(
            tap((todo: Todo) => ctx.patchState({
                items: state.items.map(i => i.ID === ID ? {...i, ...todo} : i),
            }))
        );
    }

    @Action(actions.DeleteTodo)
    delete(ctx: StateContext<TodosModel>, {ID}: actions.DeleteTodo) {
        const state = ctx.getState();
        return this.todoResolver.deleteTodo(ID).pipe(
            tap(() => ctx.patchState({
                total: state.total - 1,
                items: state.items.filter(i => i.ID !== ID),
            }))
        );
    }
}
